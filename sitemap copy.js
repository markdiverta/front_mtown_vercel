import axios from 'axios';
import fs from 'fs';
import path from 'path';

const siteURL = 'https://www.mtown.my';
const apiDomain = 'https://api.mtown.my';
const testMode = false; // Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; // Maximum topics per pagination is 999

const topics = [
  {
    catSlug: '/news/',
    catID: 1
  },
  // Add more topics as needed
];

async function fetchDynamicRoutes() {
  const routes = [];
  for (const topic of topics) {
    try {
      const apiUrl = `${apiDomain}/rcms-api/1/content/list?topics_group_id=${topic.catID}&cnt=${generateLimit}`;
      const response = await axios.get(apiUrl);
      const articles = response.data.list;

      // Generate list landing page for each Topics group
      routes.push({
        route: topic.catSlug,
      });

      // Normal loop without pagination
      for (const article of articles) {
        let slug = article.slug || article.topics_id;
        let url = topic.catSlug + slug + '/';
        routes.push({ route: url });
      }
    } catch (error) {
      console.error(`Error fetching dynamic routes for ${topic.catSlug}:`, error);
    }
  }
  return routes;
}

export async function generateSitemap() {
  const dynamicRoutes = await fetchDynamicRoutes();
  const staticRoutes = [
    '/',
    '/about',
    '/products',
    '/contact',
    // Add more static routes as needed
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemapXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes.map(route => `
        <url>
          <loc>${siteURL}${route.route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>
  `;
  return sitemapXml;
}

export async function writeSitemapXml() {
  try {
    const sitemapXmlContent = await generateSitemap();
    const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapXmlContent);
    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}
