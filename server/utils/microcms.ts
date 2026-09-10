import type { MicroCMSListResponse } from '#shared/types/microcms'

/**
 * microCMS client stub.
 * Pages currently read from `app/data`. Swap callers to this helper
 * once `NUXT_MICROCMS_API_KEY` and `NUXT_PUBLIC_MICROCMS_SERVICE_DOMAIN` are set.
 */
export async function fetchMicroCMSList<T>(
  endpoint: string,
  query: Record<string, string | number> = {},
): Promise<MicroCMSListResponse<T>> {
  const config = useRuntimeConfig()
  const domain = config.public.microCmsServiceDomain
  const apiKey = config.microCmsApiKey

  if (!domain || !apiKey) {
    throw new Error('microCMS is not configured. Use static data until env keys are set.')
  }

  return $fetch<MicroCMSListResponse<T>>(`https://${domain}.microcms.io/api/v1/${endpoint}`, {
    headers: { 'X-MICROCMS-API-KEY': apiKey },
    query,
  })
}
