import type { MicroCMSListResponse } from '#shared/types/microcms'

const DEFAULT_LIMIT = 100

function apiUrl(origin: string, endpoint: string): string {
  const normalizedOrigin = origin.replace(/\/+$/, '')
  const normalizedEndpoint = endpoint.replace(/^\/+|\/+$/g, '')
  return `${normalizedOrigin}/api/v1/${normalizedEndpoint}`
}

// Every prerendered route requests the same collections, so without this the number of
// microCMS calls scales with the route count and the build can trip API rate limits.
const prerenderCache = new Map<string, Promise<MicroCMSListResponse<unknown>>>()

export async function fetchMicroCMSList<T>(
  endpoint: string,
  query: Record<string, string | number> = {},
): Promise<MicroCMSListResponse<T>> {
  if (!import.meta.prerender) {
    return requestMicroCMSList<T>(endpoint, query)
  }

  const cacheKey = `${endpoint}:${JSON.stringify(query)}`
  let pending = prerenderCache.get(cacheKey)

  if (!pending) {
    pending = requestMicroCMSList<T>(endpoint, query)
    prerenderCache.set(cacheKey, pending)
    pending.catch(() => prerenderCache.delete(cacheKey))
  }

  return await pending as MicroCMSListResponse<T>
}

async function requestMicroCMSList<T>(
  endpoint: string,
  query: Record<string, string | number>,
): Promise<MicroCMSListResponse<T>> {
  const config = useRuntimeConfig()
  const origin = config.public.apiBaseUrl
  const apiKey = config.microcmsApiKey

  if (!origin || !apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'microCMS is not configured',
    })
  }

  const requestedLimit = Number(query.limit ?? DEFAULT_LIMIT)
  const contents: T[] = []
  let offset = Number(query.offset ?? 0)
  let totalCount = 0

  do {
    const response = await $fetch<MicroCMSListResponse<T>>(apiUrl(origin, endpoint), {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      query: {
        ...query,
        limit: Math.min(requestedLimit, DEFAULT_LIMIT),
        offset,
      },
    })

    contents.push(...response.contents)
    totalCount = response.totalCount
    offset += response.contents.length

    if (response.contents.length === 0) break
  } while (offset < totalCount)

  return {
    contents,
    totalCount,
    offset: Number(query.offset ?? 0),
    limit: contents.length,
  }
}
