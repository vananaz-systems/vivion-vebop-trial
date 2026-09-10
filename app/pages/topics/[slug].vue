<script setup lang="ts">
const route = useRoute()
const { getTopicBySlug } = useTopics()
const topic = computed(() => getTopicBySlug(String(route.params.slug)))

if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
}

useSeo({
  title: topic.value.title,
  description: topic.value.excerpt,
})
</script>

<template>
  <article v-if="topic" class="l-content p-topic">
    <AppPageHeader
      eyebrow="TOPICS"
      :title="topic.title"
      :description="formatDate(topic.publishedAt)"
    />
    <p v-for="(paragraph, index) in topic.body" :key="index">
      {{ paragraph }}
    </p>
    <NuxtLink to="/topics/">TOPICS一覧へ</NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
.p-topic {
  display: grid;
  gap: 1.25rem;

  p {
    max-width: 44rem;
  }
}
</style>
