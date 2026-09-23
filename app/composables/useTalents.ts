import { ARCHIVE_UNIT_ORDER } from '~/utils/constants'
import type { MicroCMSListResponse } from '#shared/types/microcms'
import type { Talent, TalentUnit } from '#shared/types/talent'

export function useTalents() {
  const talents = useState<Talent[]>('cms:talents', () => [])
  const units = useState<TalentUnit[]>('cms:units', () => [])

  const archiveUnits = computed(() =>
    ARCHIVE_UNIT_ORDER
      .map(slug => units.value.find(unit => unit.slug === slug))
      .filter((unit): unit is TalentUnit => Boolean(unit)),
  )

  function getTalentBySlug(slug: string): Talent | undefined {
    return talents.value.find(talent => talent.slug === slug)
  }

  function getUnitBySlug(slug: string): TalentUnit | undefined {
    return units.value.find(unit => unit.slug === slug)
  }

  function sortTalentsByOrder(list: Talent[]) {
    return [...list].sort((a, b) => a.order - b.order)
  }

  function getTalentsByUnit(unitSlug: string): Talent[] {
    return sortTalentsByOrder(talents.value.filter(talent => talent.unit?.slug === unitSlug))
  }

  function getArchiveTalents(unitSlug?: string | null): Talent[] {
    if (!unitSlug) return sortTalentsByOrder(talents.value)
    return getTalentsByUnit(unitSlug)
  }

  function isArchiveUnit(slug: string): boolean {
    return (ARCHIVE_UNIT_ORDER as readonly string[]).includes(slug)
  }

  return {
    talents,
    units,
    archiveUnits,
    getTalentBySlug,
    getUnitBySlug,
    getTalentsByUnit,
    getArchiveTalents,
    isArchiveUnit,
  }
}

export async function loadTalentsData(): Promise<void> {
  const talents = useState<Talent[]>('cms:talents', () => [])
  const units = useState<TalentUnit[]>('cms:units', () => [])
  const requestFetch = useRequestFetch()

  const [{ data: talentResponse, error: talentError }, { data: unitResponse, error: unitError }] =
    await Promise.all([
      useAsyncData(
        'cms:talents:request',
        () => requestFetch<MicroCMSListResponse<Talent>>('/api/cms/vebop-talents'),
      ),
      useAsyncData(
        'cms:units:request',
        () => requestFetch<MicroCMSListResponse<TalentUnit>>('/api/cms/vebop-units'),
      ),
    ])

  const error = talentError.value || unitError.value
  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to load talents from microCMS',
      cause: error,
    })
  }

  talents.value = talentResponse.value?.contents ?? []
  units.value = unitResponse.value?.contents ?? []
}
