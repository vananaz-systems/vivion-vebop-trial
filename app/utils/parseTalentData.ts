import type { TalentMetadata } from '#shared/types/talent'

function isTalentMetadata(value: unknown): value is TalentMetadata {
  if (!value || typeof value !== 'object') return false
  const entry = value as TalentMetadata
  return typeof entry.headline === 'string' && typeof entry.content === 'string'
}

export function parseTalentData(data: unknown): TalentMetadata[] {
  if (Array.isArray(data)) {
    return data.filter(isTalentMetadata)
  }

  if (typeof data !== 'string' || !data.trim()) {
    return []
  }

  try {
    return parseTalentData(JSON.parse(data))
  } catch {
    return []
  }
}
