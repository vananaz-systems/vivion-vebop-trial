<script setup lang="ts">
const { brand } = useAppConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${brand.siteName}` : brand.siteName
  },
})

useSeoMeta({
  ogImage: brand.ogImage,
  ogType: 'website',
  ogSiteName: brand.siteName,
  twitterCard: 'summary_large_image',
  twitterSite: `@${brand.sns.xHandle}`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
