/** Shape used when static data is later replaced by microCMS. */
export interface MicroCMSImage {
  url: string
  height: number
  width: number
}

export interface MicroCMSContent {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export interface MicroCMSListResponse<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
