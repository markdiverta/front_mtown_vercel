import axios from 'axios';
import { generateSitemapXml, fetchDynamicRoutes } from '../sitemap'; // Assuming your helper functions are in the root

export default async function handler(req, res) {
  try {
    // Fetch dynamic routes
    await fetchDynamicRoutes();

    // Generate the sitemap XML
    const sitemapXmlContent = generateSitemapXml();

    // Set the content type to XML and return the sitemap
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapXmlContent);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
}
