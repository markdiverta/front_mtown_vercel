// server/api/sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import axios from 'axios';

export default defineEventHandler(async (event) => {

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about/', changefreq: 'daily', priority: 0.7 },
  ];

  const stream = new SitemapStream({ hostname: 'https://front-mtown-vercel-dev.vercel.app/' });
  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  event.node.res.setHeader('Content-Type', 'application/xml');
  return xmlString;
});
