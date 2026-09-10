import { talents, units } from '~/data/talents'
import type { Talent, TalentUnit } from '#shared/types/talent'

export function useTalents() {
  const featuredUnits = computed(() =>
    units.filter(unit => ['putera', 'maboroshi', 'nyankomeshi', 'meiden'].includes(unit.id)),
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

  return {
    talents,
    units,
    featuredUnits,
    getTalentBySlug,
    getUnitById,
    getTalentsByUnit,
  }
}
