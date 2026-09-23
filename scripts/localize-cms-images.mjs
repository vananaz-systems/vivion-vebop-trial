import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const OUTPUT_DIR = path.resolve('.output/public')
const LOCAL_REL_DIR = 'images/cms'
const CMS_URL_RE = /https:\/\/images\.microcms-assets\.io\/[^\s"'<>()\\]+/g
const ESCAPED_CMS_URL_RE
  = /https:(?:\\u002F){2}images\.microcms-assets\.io(?:(?:\\u002F)|[^\s"'<>()[\]\\])+/g
const TEXT_EXTENSIONS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt'])
const APP_BASE = normalizeBase(process.env.NUXT_APP_BASE_URL || '/')
const SITE_ORIGIN = (process.env.NUXT_PUBLIC_SITE_URL
  || 'https://vivion-vebop-trial.vercel.app').replace(/\/+$/, '')
const DRY_RUN = process.argv.includes('--dry-run')

function normalizeBase(base) {
  if (!base || base === '/') return ''
  return `/${base.replace(/^\/+|\/+$/g, '')}`
}

function decodeEntities(url) {
  return url
    .replaceAll('\\u002F', '/')
    .replace(/&(?:amp|#0*38|#[xX]0*26);/g, '&')
}

function fileNameFor(url) {
  const pathname = url.split(/[?#]/)[0]
  const extension = path.extname(pathname).toLowerCase()
  const safeExtension = /^\.[a-z0-9]+$/.test(extension) ? extension : '.img'
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 16)
  return `cms-${hash}${safeExtension}`
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(fullPath))
    else files.push(fullPath)
  }

  return files
}

async function runPool(items, worker, concurrency = 8) {
  const queue = [...items]
  const workers = Array.from(
    { length: Math.min(concurrency, queue.length) },
    async () => {
      while (queue.length > 0) {
        const item = queue.shift()
        if (item) await worker(item)
      }
    },
  )
  await Promise.all(workers)
}

async function run() {
  try {
    if (!(await stat(OUTPUT_DIR)).isDirectory()) return
  } catch {
    console.log('skip localize-cms-images: run nuxt generate first')
    return
  }

  const textFiles = (await walk(OUTPUT_DIR))
    .filter(file => TEXT_EXTENSIONS.has(path.extname(file)))
  const rawUrls = new Set()

  for (const file of textFiles) {
    const source = await readFile(file, 'utf8')
    const matches = [
      ...(source.match(CMS_URL_RE) ?? []),
      ...(source.match(ESCAPED_CMS_URL_RE) ?? []),
    ]
    matches.forEach(url => rawUrls.add(url))
  }

  if (rawUrls.size === 0) {
    console.log('localize-cms-images: no microCMS images found')
    return
  }

  const imageMap = new Map()
  for (const rawUrl of rawUrls) {
    const url = decodeEntities(rawUrl)
    const fileName = fileNameFor(url)
    const existing = imageMap.get(url)
    if (existing) {
      existing.rawUrls.push(rawUrl)
      continue
    }
    imageMap.set(url, {
      rawUrls: [rawUrl],
      url,
      fileName,
      localUrl: `${APP_BASE}/${LOCAL_REL_DIR}/${fileName}`,
      absoluteUrl: `${SITE_ORIGIN}${APP_BASE}/${LOCAL_REL_DIR}/${fileName}`,
    })
  }
  const images = [...imageMap.values()]

  console.log(`localize-cms-images: found ${images.length} unique images`)
  if (DRY_RUN) return

  const destination = path.join(OUTPUT_DIR, LOCAL_REL_DIR)
  await mkdir(destination, { recursive: true })
  const succeeded = []

  await runPool(images, async (image) => {
    try {
      const response = await fetch(image.url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      await writeFile(
        path.join(destination, image.fileName),
        Buffer.from(await response.arrayBuffer()),
      )
      succeeded.push(image)
    } catch (error) {
      console.warn(`localize-cms-images: keeping remote URL ${image.url}: ${error}`)
    }
  })

  const metaTag = /<meta\b[^>]*>/gi
  const imageMeta = /(?:property|name)=["'](?:og:image(?::secure_url)?|twitter:image)["']/i
  let updated = 0

  for (const file of textFiles) {
    const source = await readFile(file, 'utf8')
    let output = source.replace(metaTag, (tag) => {
      if (!imageMeta.test(tag)) return tag
      return succeeded.reduce((value, image) => {
        for (const rawUrl of image.rawUrls) {
          value = value.split(rawUrl).join(image.absoluteUrl)
        }
        return value
      }, tag)
    })

    for (const image of succeeded) {
      for (const rawUrl of image.rawUrls) {
        const replacement = rawUrl.includes('\\u002F')
          ? image.localUrl.replaceAll('/', '\\u002F')
          : image.localUrl
        output = output.split(rawUrl).join(replacement)
      }
    }

    if (output !== source) {
      await writeFile(file, output, 'utf8')
      updated += 1
    }
  }

  console.log(
    `localize-cms-images: downloaded ${succeeded.length}/${images.length}, updated ${updated} files`,
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
