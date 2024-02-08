import axios from 'axios';
const fs = require('fs');
const siteURL = 'https://www.mtown.my';
const apiDomain = 'https://api.mtown.my';
var testMode = false; //Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; //Maximum topics per pagination is 999
const routes = [];

// Dynamic routes setup
async function fetchDynamicRoutes() {
  const listGenerate = [];
  const topics = [
      {
          catSlug: '/news/',
          catID: 1
      },
      {
          catSlug: '/eat/',
          catID: 7
      }
  ];
  try {
    for (const topic of topics) {
      var index = topics.indexOf(topic)+1;
      var apiUrl;
      apiUrl = apiDomain + '/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=' + generateLimit;

      // Category landing page
      routes.push(
          topic.catSlug
      ); 
      
      // Normal loop without pagination
      try {
        var response = await axios.get(apiUrl);
        var articles = response.data.list;
        for (const article of articles) {
          let slug;
          let url = topic.catSlug;
          
          if (article.contents_type_slug && article.contents_type_parent_nm) { //If categories & has parent
              let encodeSlug = article.contents_type_slug;
              url += encodeSlug + '/';
          };

          if (/%[0-9a-fA-F]{2}/.test(article.slug)) { //If slug contain japanese text or percent-encoded characters
              slug = article.topics_id
          } else {
              slug = article.slug ? article.slug : article.topics_id
          };
          
          url += slug + '/';
          routes.push(url);
        }
      }
      catch(error) {
          console.error('API ERROR:', error.message);
      };

      //Additional loop for pagination
      let pageNum = testMode ? 0 : response.data.pageInfo.totalPageCnt;
      if (pageNum >= 2){
        for (let i = 2; i <= pageNum; i++){
          let paginationURL = apiDomain + '/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=' + generateLimit + '&pageID=' + i;
          try {
            let response = await axios.get(paginationURL);
            let articles = response.data.list;
            for (const article of articles) {
                let slug;
                let url = topic.catSlug;
                
                if (article.contents_type_slug && article.contents_type_parent_nm) { //If categories & has parent
                    let encodeSlug = article.contents_type_slug;
                    url += encodeSlug + '/';
                };
                if (/%[0-9a-fA-F]{2}/.test(article.slug)) { //If slug contain japanese text or percent-encoded characters
                    slug = article.topics_id
                } else {
                    slug = article.slug ? article.slug : article.topics_id
                };
                url += slug + '/';
                routes.push(url);
            }
          }
          catch(error) {
              console.error('API ERROR:', error.message);
          };
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching dynamic routes for ${topic.catSlug}:`, error);
  }
};
fetchDynamicRoutes();

// Static routes setup
routes.push(
  '/',
  '/about/',
  '/products/',
  '/contact/',
  // Add more routes as needed
);

console.log(routes);

// Generate sitemap.xml content
function generateSitemapXml() {
  const sitemapXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes.map(route => `
        <url>
          <loc>${siteURL}${route}</loc>
        </url>
      `).join('')}
    </urlset>
  `;

  return sitemapXml;
}

// Function to write the sitemap.xml file to the public directory
function writeSitemapXml() {
  const sitemapXmlContent = generateSitemapXml();
  fs.writeFileSync('public/sitemap.xml', sitemapXmlContent);
}

// Export the function to generate the sitemap
module.exports = writeSitemapXml;