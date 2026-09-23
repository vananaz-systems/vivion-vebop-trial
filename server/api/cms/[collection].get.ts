const COLLECTIONS = new Set([
  'vebop-talents',
  'vebop-units',
  'vebop-topics',
  'vebop-tags',
  'vebop-categories',
])

export default defineEventHandler(async (event) => {
  const collection = getRouterParam(event, 'collection') || ''

  if (!COLLECTIONS.has(collection)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'CMS collection not found',
    })
  }

  return fetchMicroCMSList(collection, {
    depth: 3,
  })
})
