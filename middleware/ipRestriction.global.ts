// middleware/ipRestriction.js
import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const allowedIPs = 
    [
        '123.45.67.89', 
        '161.142.139.187'   //Mark
    ];
  // console.log('access');
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const clientIP = response.data.ip;

        console.log('clientIP check');
        console.log(clientIP);
        let homeURL = '/';
        if (process.client) {
          homeURL = window.location.origin;
        };

        if (!allowedIPs.includes(clientIP)) { //User IP not on the allowed list
          console.log('not allowed');
          if (to.name !== '403') {
            return navigateTo('/403', { redirectCode: 301 });
          };
        } else { //User IP is allowed
          console.log('allowed');
          if (to.name == '403') {
            return navigateTo(homeURL, { redirectCode: 301 });
          };
        };
    } catch (error) {
        console.error('Error fetching client IP:', error);
        if (to.name !== '403') {
          return navigateTo('/403', { redirectCode: 301 });
        };
    }
});
