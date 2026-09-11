export interface Topic {
  id: string
  slug: string
  title: string
  publishedAt: string
  excerpt: string
  body: string[]
  /** Official WordPress tags. `#NEWS` is currently the only category. */
  tags: string[]
}
