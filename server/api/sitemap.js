import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import axios from 'axios';

const config = useRuntimeConfig();
const siteURL = config.public.domainName;
const apiDomain = config.public.kurocoApiDomain;
const testMode = false; // Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; // Maximum topics per pagination is 999

console.log('run');

const now = new Date();
const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
const hours = now.getHours();
const minutes = now.getMinutes();
console.log(`Today is day ${day} and the time is ${hours}:${minutes}.`);

// Function to fetch dynamic routes
async function fetchDynamicRoutes() {
  const routes = [];

  // List of topic categories
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

  // Fetch dynamic routes for each topic
  await Promise.all(topics.map(async (topic) => {
    try {
      const apiUrl = `${apiDomain}/rcms-api/1/content/list?topics_group_id=${topic.catID}&cnt=${generateLimit}`;
      const response = await axios.get(apiUrl);
      const articles = response.data.list;

      routes.push(topic.catSlug); // Add category landing page

      // Add each article to routes
      articles.forEach(article => {
        let slug = article.slug || article.topics_id;
        if (/%[0-9a-fA-F]{2}/.test(slug)) slug = article.topics_id;
        const url = `${topic.catSlug}${article.contents_type_slug ? article.contents_type_slug + '/' : ''}${slug}/`;
        routes.push(url);
      });

      // Handle pagination if necessary
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
  // Static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily' },
    { url: '/about/', changefreq: 'daily' },
  ];

  // Fetch dynamic routes
  const dynamicRoutes = await fetchDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [
    ...staticRoutes,
    ...dynamicRoutes.map(route => ({ url: route, changefreq: 'weekly' })),
  ];

  // Generate sitemap
  const stream = new SitemapStream({ hostname: siteURL });
  const xmlString = await streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => data.toString());

  // Set response headers and return the sitemap
  event.node.res.setHeader('Content-Type', 'application/xml');
  return xmlString;
});
