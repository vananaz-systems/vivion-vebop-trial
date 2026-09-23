export function useSeo(options: {
  title: string
  description?: string
}) {
  const { brand } = useAppConfig()
  const route = useRoute()
  const isHome = options.title === brand.siteName
  const canonicalUrl = new URL(route.path, `${brand.siteUrl}/`).toString()

  useHead({
    title: isHome ? '' : options.title,
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  })

  useSeoMeta({
    description: options.description ?? brand.description,
    ogTitle: isHome ? brand.siteName : options.title,
    ogDescription: options.description ?? brand.description,
    ogImage: brand.ogImage,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterImage: brand.ogImage,
  })
}
