import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import axios from 'axios';

const config = useRuntimeConfig();
const siteURL = config.public.domainName;
const apiDomain = config.public.kurocoApiDomain;
const testMode = false; // Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; // Maximum topics per pagination is 999


export default defineEventHandler(async (event) => {
  // Static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily'},
    { url: '/about/', changefreq: 'daily'},
  ];

  // Fetch dynamic routes
  // const dynamicRoutes = await fetchDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes.map(route => ({ url: route, changefreq: 'weekly'}))];

  // Generate sitemap
  const stream = new SitemapStream({ hostname: siteURL });
  const xmlString = await streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => data.toString());

  // Set response headers and return the sitemap
  event.node.res.setHeader('Content-Type', 'application/xml');
  return xmlString;
});