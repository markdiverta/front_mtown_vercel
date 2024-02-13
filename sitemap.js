import axios from 'axios';
const fs = require('fs');
const siteURL = 'https://www.mtown.my';
const apiDomain = 'https://api.mtown.my';
var testMode = false; //Change to true or false if you want to enable dev mode for quick generate
const generateLimit = testMode ? 50 : 999; //Maximum topics per pagination is 999
const routes = [];

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
};

// Static routes setup
routes.push(
  '/',
  '/about-us/',
  '/media/',
  '/newsletter/',
  '/inquiry/',
  '/search/'
);

// Dynamic routes setup
async function fetchDynamicRoutes() {
  
  //News categories landing
  const apiNewsCategory = apiDomain + '/rcms-api/1/content/category?topics_group_id=1';
  try {
      const responseNewsCat = await axios.get(apiNewsCategory);
      var newsCat = responseNewsCat.data.list;
      for (const topic of newsCat) {
          if (topic.slug && topic.child_level == 2) {
              let url = '/news/' + topic.slug + '/';
              routes.push(
                  url
              );
          }
      };
  } catch (error) {
      console.error('API ERROR:', apiEbook + ' - ' + error.message);
  };

  //News details single page
  const topics = [
      {
          catSlug: '/news/',
          catID: 1
      },
      {
          catSlug: '/eat/',
          catID: 7
      },
      {
          catSlug: '/life/',
          catID: 8
      },
      {
          catSlug: '/feature/',
          catID: 9
      },
      {
          catSlug: '/interview/',
          catID: 10
      },
      {
          catSlug: '/column/comics/',
          catID: 11
      },
      {
          catSlug: '/community/',
          catID: 12
      },
      {
          catSlug: '/column/malaysia-profiles/', //マレーシア美人ライフ
          catID: 13
      },
      {
          catSlug: '/column/', //columns
          catID: 14
      },
      {
          catSlug: '/backnumber/', //バックナンバー
          catID: 15
      },
  ];
  try {
    for (const topic of topics) {
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


// Function to write the sitemap.xml file to the public directory
async function writeSitemapXml() {
  try {
    // Wait for dynamic routes to be fetched and populated
    await fetchDynamicRoutes();

    // Generate sitemap.xml content
    const sitemapXmlContent = generateSitemapXml();

    // Write sitemap.xml to the public directory
    fs.writeFileSync('public/sitemap.xml', sitemapXmlContent);
  } catch (error) {
    console.error('Error writing sitemap.xml:', error);
  }
};


// Export the function to generate the sitemap
module.exports = writeSitemapXml;