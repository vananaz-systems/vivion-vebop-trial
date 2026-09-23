<script setup lang="ts">
await loadTopicsData()

useSeo({
  title: 'TOPICS',
  description: 'ビバップ高校のお知らせ一覧。',
})
</script>

<template>
  <TopicsArchive />
</template>
