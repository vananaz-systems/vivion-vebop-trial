import { talents } from '~/data/talents'
import { units } from '~/data/units'
import { ARCHIVE_UNIT_ORDER } from '~/utils/constants'
import type { Talent, TalentUnit } from '#shared/types/talent'

export function useTalents() {
  const archiveUnits = computed(() =>
    ARCHIVE_UNIT_ORDER
      .map(slug => units.find(unit => unit.slug === slug))
      .filter((unit): unit is TalentUnit => Boolean(unit)),
  )

  function getTalentBySlug(slug: string): Talent | undefined {
    return talents.find(talent => talent.slug === slug)
  }

  function getUnitBySlug(slug: string): TalentUnit | undefined {
    return units.find(unit => unit.slug === slug)
  }

  function sortTalentsByOrder(list: Talent[]) {
    return [...list].sort((a, b) => a.order - b.order)
  }

  function getTalentsByUnit(unitSlug: string): Talent[] {
    return sortTalentsByOrder(talents.filter(talent => talent.unit?.slug === unitSlug))
  }

  function getArchiveTalents(unitSlug?: string | null): Talent[] {
    if (!unitSlug) return sortTalentsByOrder(talents)
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
