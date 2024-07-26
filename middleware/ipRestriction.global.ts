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

        // console.log('clientIP check');
        // console.log(clientIP);

        if (!allowedIPs.includes(clientIP)) {
          if (to.name !== '403') {
          console.log('access 403');
            return navigateTo('/403', { redirectCode: 301 });
          };
        } else {
          if (to.name == '403') {
            console.log('access home');
            return navigateTo('/', { redirectCode: 301 });
          };
        };
    } catch (error) {
        console.error('Error fetching client IP:', error);
        return navigateTo('/'); // Redirect to a forbidden page in case of error
    }
});
