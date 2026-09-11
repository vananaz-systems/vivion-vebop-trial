import { talents, units } from '~/data/talents'
import { ARCHIVE_UNIT_ORDER, HOME_UNIT_ORDER } from '~/utils/constants'
import type { Talent, TalentUnit } from '#shared/types/talent'

export function useTalents() {
  const featuredUnits = computed(() =>
    HOME_UNIT_ORDER
      .map(id => units.find(unit => unit.id === id))
      .filter((unit): unit is TalentUnit => Boolean(unit)),
  )

  const archiveUnits = computed(() =>
    ARCHIVE_UNIT_ORDER
      .map(id => units.find(unit => unit.id === id && unit.inArchive))
      .filter((unit): unit is TalentUnit => Boolean(unit)),
  )

  function getTalentBySlug(slug: string): Talent | undefined {
    return talents.find(talent => talent.slug === slug)
  }

  function getUnitById(id: string): TalentUnit | undefined {
    return units.find(unit => unit.id === id)
  }

  function getTalentsByUnit(unitId: string): Talent[] {
    return talents.filter(talent => talent.unitId === unitId)
  }

  function getArchiveTalents(unitId?: string | null): Talent[] {
    if (!unitId) return talents
    return talents.filter(talent => talent.unitId === unitId)
  }

  function isArchiveUnit(id: string): boolean {
    return (ARCHIVE_UNIT_ORDER as readonly string[]).includes(id)
  }

  return {
    talents,
    units,
    featuredUnits,
    archiveUnits,
    getTalentBySlug,
    getUnitById,
    getTalentsByUnit,
    getArchiveTalents,
    isArchiveUnit,
  }
}
