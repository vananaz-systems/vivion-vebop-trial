<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  variant?: 'icon' | 'wordmark'
}>(), {
  to: '/',
  variant: 'icon',
})

const { brand } = useSite()
</script>

<template>
  <NuxtLink :to="to" class="c-logo" :class="{ 'c-logo--wordmark': variant === 'wordmark' }">
    <picture v-if="variant === 'wordmark'">
      <source type="image/webp" srcset="/images/common/logo.webp">
      <img :src="brand.logo.white" :alt="brand.siteName" decoding="async">
    </picture>
    <img v-else :src="brand.logo.default" :alt="brand.siteName" decoding="async">
  </NuxtLink>
</template>

<style lang="scss" scoped>
.c-logo {
  display: block;
  width: 30px;
  flex-shrink: 0;
  margin-bottom: 6px;

  img {
    width: 100%;
    height: auto;
  }

  &--wordmark {
    width: 100%;
    margin-bottom: 0;
  }
}
</style>
