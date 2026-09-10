<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
}>(), {
  to: '/',
})

const { brand } = useSite()
</script>

<template>
  <NuxtLink :to="to" class="c-logo">
    <img :src="brand.logo.default" :alt="brand.siteName">
  </NuxtLink>
</template>

<style lang="scss" scoped>
.c-logo {
  display: block;
  width: 30px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
