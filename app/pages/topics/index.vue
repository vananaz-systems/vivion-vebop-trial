<script setup lang="ts">
const { topics } = useTopics()

useSeo({
  title: 'TOPICS',
  description: 'ビバップ高校のお知らせ一覧。',
})
</script>

<template>
  <div class="l-content">
    <AppPageHeader
      eyebrow="TOPICS"
      title="お知らせ"
      description="運営からの最新情報を掲載しています。"
    />
    <TopicCard v-for="topic in topics" :key="topic.id" :topic="topic" />
  </div>
</template>
