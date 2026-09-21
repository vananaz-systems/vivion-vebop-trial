import type { MicroCMSContent, MicroCMSImage } from '#shared/types/microcms'

export interface TopicCategory extends MicroCMSContent {
  slug: string
  name: string
  parentCategory: { id: string } | null
}

export interface TopicTag extends MicroCMSContent {
  slug: string
  name: string
}

export interface Topic extends MicroCMSContent {
  title: string
  content: string
  featuredImage?: MicroCMSImage
  visibility: string[]
  tags: TopicTag[]
  categories: TopicCategory[]
}
