import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import axios from 'axios';

const config = useRuntimeConfig();
const siteURL = config.public.domainName;
const apiDomain = config.public.kurocoApiDomain;
const testMode = false;
const generateLimit = testMode ? 50 : 999;

async function fetchDynamicRoutes() {
  const routes = [];

  const topics = [
    { catSlug: '/news/', catID: 1 },
    { catSlug: '/eat/', catID: 7 },
    { catSlug: '/life/', catID: 8 },
    { catSlug: '/feature/', catID: 9 },
    { catSlug: '/interview/', catID: 10 },
    { catSlug: '/column/comics/', catID: 11 },
    { catSlug: '/community/', catID: 12 },
    { catSlug: '/column/malaysia-profiles/', catID: 13 },
    { catSlug: '/column/', catID: 14 },
    { catSlug: '/backnumber/', catID: 15 },
  ];

  await Promise.all(topics.map(async (topic) => {
    try {
      const apiUrl = `${apiDomain}/rcms-api/1/content/list?topics_group_id=${topic.catID}&cnt=${generateLimit}`;
      const response = await axios.get(apiUrl);
      const articles = response.data.list;
      
      routes.push(topic.catSlug);
      articles.forEach(article => {
        let slug = article.slug || article.topics_id;
        if (/%[0-9a-fA-F]{2}/.test(slug)) slug = article.topics_id;
        let category = article.contents_type_slug ? article.contents_type_slug + '/' : '';
        if (topic.catID != 1 && topic.catID != 11 && topic.catID != 14) category = '';
        const url = `${topic.catSlug}${category}${slug}/`;
        routes.push(url);
      });

      if (!testMode && response.data.pageInfo.totalPageCnt > 1) {
        const pageUrls = await Promise.all(
          Array.from({ length: response.data.pageInfo.totalPageCnt - 1 }, (_, i) => i + 2).map(async (pageID) => {
            const paginatedResponse = await axios.get(`${apiUrl}&pageID=${pageID}`);
            return paginatedResponse.data.list.map(article => {
              let slug = article.slug || article.topics_id;
              if (/%[0-9a-fA-F]{2}/.test(slug)) slug = article.topics_id;
              return `${topic.catSlug}${article.contents_type_slug ? article.contents_type_slug + '/' : ''}${slug}/`;
            });
          })
        );
        routes.push(...pageUrls.flat());
      }
    } catch (error) {
      console.error(`Error fetching routes for ${topic.catSlug}: ${error.message}`);
    }
  }));

  return routes;
}

export default defineEventHandler(async (event) => {
  const staticRoutes = [
    { url: '/', changefreq: 'weekly' },
    { url: '/newsletter/', changefreq: 'weekly' },
    { url: '/inquiry/', changefreq: 'weekly' },
    { url: '/search/', changefreq: 'weekly' },
    { url: '/about-us/', changefreq: 'weekly' },
    { url: '/media/', changefreq: 'weekly' },
    { url: '/column/j-league/', changefreq: 'weekly' },
    { url: '/column/malaysia-calendar/', changefreq: 'weekly' },
    { url: '/news/economic/', changefreq: 'weekly' },
    { url: '/news/politics/', changefreq: 'weekly' },
    { url: '/news/nikkei/', changefreq: 'weekly' },
    { url: '/news/others/', changefreq: 'weekly' },
    { url: '/news/covid-19/', changefreq: 'weekly' },
  ];

  const dynamicRoutes = await fetchDynamicRoutes();

  const allRoutes = [
    ...staticRoutes,
    ...dynamicRoutes.map(route => ({ url: route, changefreq: 'weekly' })),
  ];

  const stream = new SitemapStream({ hostname: siteURL });
  const xmlString = await streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => data.toString());

  event.node.res.setHeader('Content-Type', 'application/xml');
  event.node.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  event.node.res.setHeader('Pragma', 'no-cache');
  event.node.res.setHeader('Expires', '0');
  event.node.res.setHeader('Surrogate-Control', 'no-store');
  return xmlString;
});
