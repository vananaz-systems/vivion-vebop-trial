<script setup lang="ts">
const route = useRoute()
const { topics } = useTopics()

const slug = computed(() => String(route.params.slug).toLowerCase())

const matchedTag = computed(() => {
  for (const topic of topics.value) {
    const tag = topic.tags.find(item => item.slug === slug.value)
    if (tag) return tag
  }
  return undefined
})

if (!matchedTag.value) {
  throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
}

watch(slug, () => {
  if (!matchedTag.value) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
  }
})

useSeo({
  title: matchedTag.value.name,
  description: `ビバップ高校の${matchedTag.value.name}一覧。`,
})
</script>

<template>
  <TopicsArchive :active-tag="slug" />
</template>
