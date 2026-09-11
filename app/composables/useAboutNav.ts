import { INTRO_ABOUT_HASH_DELAY_MS } from '~/composables/useIntroLoader'

const ABOUT_ID = 'About'
const ABOUT_HASH = '#About'

export function isAboutNavTo(to: string) {
  const normalized = to.replace(/\/$/, '').toLowerCase()
  return normalized === '/#about' || normalized === '#about'
}

export function isHomePath(path: string) {
  return path === '/' || path === ''
}

export function scrollToAboutSection() {
  if (!import.meta.client) return
  document.getElementById(ABOUT_ID)?.scrollIntoView({ behavior: 'smooth' })
}

export function isAboutHash(hash: string) {
  return hash === ABOUT_HASH || hash === '#about'
}

export function useAboutNav() {
  const route = useRoute()

  function onAboutClick(event: Event) {
    if (!isHomePath(route.path)) return
    event.preventDefault()
    scrollToAboutSection()
    if (!isAboutHash(route.hash)) {
      void navigateTo({ path: '/', hash: ABOUT_HASH })
    }
  }

  return { onAboutClick }
}

/** Scroll to #About after homepage mount and when the hash is set. */
export function useAboutHashScroll() {
  const route = useRoute()
  const { contentRevealed } = useIntroLoader()

  function maybeScroll(afterIntro = false) {
    if (!isAboutHash(route.hash)) return
    if (!contentRevealed.value) return
    nextTick(() => {
      requestAnimationFrame(() => {
        if (afterIntro) window.setTimeout(scrollToAboutSection, INTRO_ABOUT_HASH_DELAY_MS)
        else scrollToAboutSection()
      })
    })
  }

  onMounted(() => maybeScroll())
  watch(() => route.hash, () => maybeScroll())
  watch(contentRevealed, (revealed) => {
    if (revealed) maybeScroll(true)
  })
}
