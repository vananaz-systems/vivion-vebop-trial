<script setup lang="ts">
useSeo({
  title: 'UNIT',
  description: 'ビバップ高校のユニット一覧。',
})
</script>

<template>
  <div class="p-talents">
    <AppPageHeader title="UNIT" />
    <TalentsArchive mode="unit" />
    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
// Official `#Wrap #Main` starts at opacity 0, then fades 1200ms easeInOutCirc.
.p-talents {
  opacity: 0;
  animation: talents-page-enter 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
}

@keyframes talents-page-enter {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-talents {
    opacity: 1;
    animation: none;
  }
}
</style>
