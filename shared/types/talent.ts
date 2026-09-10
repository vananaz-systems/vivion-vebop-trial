export interface TalentProfile {
  attribute?: string
  height?: string
  birthday?: string
}

export interface TalentSocials {
  x?: string
  youtube?: string
}

export interface Talent {
  id: string
  slug: string
  name: string
  nameEn: string
  unitId: string | null
  bio: string
  profile?: TalentProfile
  socials?: TalentSocials
  image?: string
}

export interface TalentUnit {
  id: string
  slug: string
  name: string
  nameEn?: string
  summary: string
  description: string[]
  image?: string
}
