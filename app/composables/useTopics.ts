import { topics } from '~/data/topics'
import type { Topic } from '#shared/types/topic'

export function useTopics() {
  const latestTopics = computed(() =>
    [...topics].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  )

  function getTopicBySlug(slug: string): Topic | undefined {
    return topics.find(topic => topic.slug === slug)
  }

  function filterTopicsByTag(tag?: string | null): Topic[] {
    if (!tag) return latestTopics.value
    return latestTopics.value.filter(topic => topic.tags.includes(tag))
  }

  return {
    topics: latestTopics,
    getTopicBySlug,
    filterTopicsByTag,
  }
}
