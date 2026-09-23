import type { MicroCMSListResponse } from '#shared/types/microcms'
import type { Topic } from '#shared/types/topic'

export function useTopics() {
  const topics = useState<Topic[]>('cms:topics', () => [])

  const latestTopics = computed(() =>
    [...topics.value].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  )

  function getTopicBySlug(slug: string): Topic | undefined {
    return topics.value.find(topic => topic.id === slug)
  }

  function filterTopicsByTag(tag?: string | null): Topic[] {
    if (!tag) return latestTopics.value
    return latestTopics.value.filter(topic =>
      topic.tags.some(item => item.slug === tag),
    )
  }

  return {
    topics: latestTopics,
    getTopicBySlug,
    filterTopicsByTag,
  }
}

export async function loadTopicsData(): Promise<void> {
  const topics = useState<Topic[]>('cms:topics', () => [])
  const requestFetch = useRequestFetch()
  const { data, error } = await useAsyncData(
    'cms:topics:request',
    () => requestFetch<MicroCMSListResponse<Topic>>('/api/cms/vebop-topics'),
  )

  if (error.value) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to load topics from microCMS',
      cause: error.value,
    })
  }

  topics.value = data.value?.contents ?? []
}
