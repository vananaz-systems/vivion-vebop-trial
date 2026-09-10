import { timingSafeEqual } from 'node:crypto'

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function readBasicCredentials(authorization: string | undefined): { user: string, password: string } | null {
  if (!authorization) {
    return null
  }

  const [scheme, encoded] = authorization.split(' ')
  if (scheme !== 'Basic' || !encoded) {
    return null
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8')
  const separatorIndex = decoded.indexOf(':')
  if (separatorIndex === -1) {
    return null
  }

  return {
    user: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  }
}

export default defineEventHandler((event) => {
  if (import.meta.prerender) {
    return
  }

  const config = useRuntimeConfig()
  const expectedUser = String(config.siteUser || process.env.SITE_USER || '')
  const expectedPassword = String(config.sitePassword || process.env.SITE_PASSWORD || '')

  if (!expectedUser || !expectedPassword) {
    return
  }

  const credentials = readBasicCredentials(getHeader(event, 'authorization'))
  const isValid = Boolean(
    credentials
    && safeEqual(credentials.user, expectedUser)
    && safeEqual(credentials.password, expectedPassword),
  )

  if (isValid) {
    return
  }

  setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Restricted"')
  throw createError({
    statusCode: 401,
    statusMessage: 'Authentication required',
  })
})
