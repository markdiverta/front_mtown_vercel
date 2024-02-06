// export default function ({ route, redirect }) {
//     console.log('Middleware: trailing-slash');
//     const hasTrailingSlash = route.path.endsWith('/');

//     console.log(hasTrailingSlash);
  
//     // if (!hasTrailingSlash) {
//     //   redirect(301, `${route.path}/`);
//     // }
//   }


export default defineNuxtRouteMiddleware((to, from) => { 

    
    const hasTrailingSlash = to.fullPath.endsWith('/');

    

    // // if (!hasTrailingSlash) {
    // //   return navigateTo('/', { redirectCode: 301 })
    // // }
    // if (from.fullPath == "/news/economic") {
    //   return navigateTo('/', { redirectCode: 301 })
    // }
    if (!hasTrailingSlash) {
      // Redirect to the root URL with a 301 redirect code
      return navigateTo(`${to.fullPath}/`, { redirectCode: 301 });
  }
});