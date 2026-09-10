<template>
  <div class="l-default">
    <AppHeader />
    <AppMenuDrawer />
    <main class="l-default__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.l-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.l-default__main {
  flex: 1;
}
</style>
