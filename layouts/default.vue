<template>
  <div>
    <AppHeader/>

    <section class="container-fluid l-content_maxWidth-lg">
    <section class="row l-page_content-row" ref="jscontentCheck">
      <slot />
    </section>
    </section>

    <FooterMobileMenu />
    
    <AppFooter />
  </div>
</template>

<script setup>
useHead({
  meta: [
    // {
    //   name: 'robots',
    //   content: 'noindex, nofollow',
    // },
    {
      name: 'google-site-verification',
      content: 'v_uOGnyOdP7FGLwK_TQfn1emRKbhXij5OudQqn2IF9Q'
    }
  ]
});
</script>