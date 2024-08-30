import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import axios from 'axios';

const config = useRuntimeConfig();
const siteURL = config.public.domainName;
const apiDomain = config.public.kurocoApiDomain;
const testMode = false; // Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; // Maximum topics per pagination is 999


// Function to fetch dynamic routes
async function fetchDynamicRoutes() {
  const routes = [];

  // News categories landing
  const apiNewsCategory = apiDomain + '/rcms-api/1/content/category?topics_group_id=1';
  try {
    const responseNewsCat = await axios.get(apiNewsCategory);
    const newsCat = responseNewsCat.data.list;
    for (const topic of newsCat) {
      if (topic.slug && topic.child_level == 2) {
        const url = '/news/' + topic.slug + '/';
        routes.push(url);
      }
    }
  } catch (error) {
    console.error('API ERROR:', apiNewsCategory + ' - ' + error.message);
  }

  // News details single page
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

  for (const topic of topics) {
    try {
      const apiUrl = `${apiDomain}/rcms-api/1/content/list?topics_group_id=${topic.catID}&cnt=${generateLimit}`;
      
      // Category landing page
      routes.push(topic.catSlug);

      // Fetching articles
      const response = await axios.get(apiUrl);
      const articles = response.data.list;
      for (const article of articles) {
        let slug;
        let url = topic.catSlug;
        
        if (article.contents_type_slug && article.contents_type_parent_nm) {
          const encodeSlug = article.contents_type_slug;
          url += encodeSlug + '/';
        }

        slug = /%[0-9a-fA-F]{2}/.test(article.slug) ? article.topics_id : (article.slug || article.topics_id);
        url += slug + '/';
        routes.push(url);
      }

      // Handling pagination if necessary
      const totalPageCount = testMode ? 0 : response.data.pageInfo.totalPageCnt;
      if (totalPageCount >= 2) {
        for (let i = 2; i <= totalPageCount; i++) {
          const paginationURL = `${apiDomain}/rcms-api/1/content/list?topics_group_id=${topic.catID}&cnt=${generateLimit}&pageID=${i}`;
          const paginatedResponse = await axios.get(paginationURL);
          const paginatedArticles = paginatedResponse.data.list;
          for (const article of paginatedArticles) {
            let slug;
            let url = topic.catSlug;
            
            if (article.contents_type_slug && article.contents_type_parent_nm) {
              const encodeSlug = article.contents_type_slug;
              url += encodeSlug + '/';
            }

            slug = /%[0-9a-fA-F]{2}/.test(article.slug) ? article.topics_id : (article.slug || article.topics_id);
            url += slug + '/';
            routes.push(url);
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching dynamic routes for ${topic.catSlug}:`, error);
    }
  }

  return routes;
}

export default defineEventHandler(async (event) => {
  // Static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about/', changefreq: 'daily', priority: 0.7 },
  ];

  // Fetch dynamic routes
  const dynamicRoutes = await fetchDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes.map(route => ({ url: route, changefreq: 'weekly'}))];

  // Generate sitemap
  const stream = new SitemapStream({ hostname: siteURL });
  const xmlString = await streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => data.toString());

  // Set response headers and return the sitemap
  event.node.res.setHeader('Content-Type', 'application/xml');
  return xmlString;
});