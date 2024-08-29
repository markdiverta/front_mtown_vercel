// middleware/ipRestriction.js
import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // if (process.client) {
    const allowedIPs = 
      [
          '123.45.67.89', 
          '161.142.139.160'   //Mark
      ];
    // console.log('access');
      try {
          const response = await axios.get('https://api.ipify.org?format=json');
          const clientIP = response.data.ip;

          console.log('clientIP check');
          // console.log(clientIP);
          // let homeURL= '/';
          let homeURL= window.location.origin;
          // let homeURL = process.client ? window.location.origin : '/';

          if (clientIP && !allowedIPs.includes(clientIP)) { //User IP not on the allowed list
            console.log('not allowed');
            if (to.name !== '403') {
              // console.log('not 403 page then go to 403');
              return navigateTo('/403', { redirectCode: 301 });
            } else {
              // console.log('already 403 page then stay');
              return true;
            };
          } else { //User IP is allowed
            // console.log(to);
            console.log('allowed');
            // console.log(homeURL);
            // console.log(to.name);
            // console.log(to.name == '403');
            if (to.name === '403') {
              console.log('is 403 page then go to home page');
              window.location.href = homeURL;
              // return navigateTo(homeURL, { external: process.client, redirectCode: 301 });
            } else {
              console.log('not 304 page then remain at current page');
              return true;
            }
          };
      } catch (error) {
          console.error('Error process logic or fetch client IP:', error);
      }
  // }
});
