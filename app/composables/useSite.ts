export function useSite() {
  const { brand } = useAppConfig()

  return {
    brand,
    nameEn: 'Vebop High School',
    tagline: '型通りより型破り',
  }
}
