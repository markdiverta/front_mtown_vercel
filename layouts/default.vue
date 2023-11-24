<template>
  <div>
    <AppHeader/>

    <section class="container-fluid l-content_maxWidth-lg">
    <section class="row l-page_content-row" ref="jscontentCheck">
      <slot />
    </section>
    </section>
    
    <AppFooter />
  </div>
</template>
  