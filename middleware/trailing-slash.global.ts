export default defineNuxtRouteMiddleware((to, from) => { 
    const hasTrailingSlash = to.fullPath.endsWith('/');
    if (!hasTrailingSlash) {
      return navigateTo(`${to.fullPath}/`, { redirectCode: 301 });
  }
});