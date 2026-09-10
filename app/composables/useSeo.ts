export function useSeo(options: {
  title: string
  description?: string
}) {
  const { brand } = useAppConfig()
  const isHome = options.title === brand.siteName

  useHead({
    title: isHome ? '' : options.title,
  })

  useSeoMeta({
    description: options.description ?? brand.description,
    ogTitle: isHome ? brand.siteName : options.title,
    ogDescription: options.description ?? brand.description,
  })
}
