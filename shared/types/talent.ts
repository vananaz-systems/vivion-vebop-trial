import type { MicroCMSContent, MicroCMSImage } from '#shared/types/microcms'

export interface TalentMetadata {
  headline: string
  content: string
}

export interface TalentUnitSummary extends MicroCMSContent {
  slug: string
  name: string
  xTwitterUrl?: string
  groupImage: MicroCMSImage
  logo: MicroCMSImage
  profileText: string
  members: Array<{ id: string }>
}

export interface Talent extends MicroCMSContent {
  order: number
  slug: string
  name: string
  nameEn: string
  thumbnail: MicroCMSImage
  portrait: MicroCMSImage
  theme: string
  unit: TalentUnitSummary | null
  profileText: string
  xTwitterLink?: string
  youtubeLink?: string
  data: TalentMetadata[]
}

export interface TalentUnitMember extends Omit<Talent, 'unit'> {
  unit: { id: string }
}

export interface TalentUnit extends MicroCMSContent {
  slug: string
  name: string
  xTwitterUrl?: string
  groupImage: MicroCMSImage
  logo: MicroCMSImage
  profileText: string
  members: TalentUnitMember[]
}
