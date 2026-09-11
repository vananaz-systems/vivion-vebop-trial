/**
 * Top-page intro (`#js-loader` / `#js-fv` / `#js-pcheader`).
 * In-app timings (bar grow sped up from official 7s).
 *
 * Bar: 300ms to 70% width (min 200ms wait), then 300ms to 100% (`cubic-bezier(0.645, 0.045, 0.355, 1)`).
 * After bar `transitionend`: wait 500ms → `.is__fadeout` (1.65s wash),
 * 2000ms → header show + FV loaded + content fade 1200ms easeInOutCirc,
 * 2500ms → remove loader. FV logo: 750ms / 1000ms delay. About hash: 400ms.
 */
export const INTRO_BAR_GROW_MS = 300
export const INTRO_BAR_END_MS = 300
export const INTRO_MIN_GROW_MS = 200
export const INTRO_FADEOUT_DELAY_MS = 500
export const INTRO_FADEOUT_MS = 1650
export const INTRO_REVEAL_DELAY_MS = 2000
export const INTRO_REMOVE_DELAY_MS = 2500
export const INTRO_CONTENT_FADE_MS = 1200
export const INTRO_FV_LOGO_MS = 750
export const INTRO_FV_LOGO_DELAY_MS = 1000
export const INTRO_ABOUT_HASH_DELAY_MS = 400

export const INTRO_BAR_EASE = 'cubic-bezier(0.645, 0.045, 0.355, 1)'
export const INTRO_CONTENT_EASE = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'

export type IntroPhase = 'idle' | 'cover' | 'start' | 'end' | 'fadeout' | 'done'

function preventScroll(event: Event) {
  event.preventDefault()
}

export function useIntroLoader() {
  const playing = useState('intro-playing', () => false)
  const phase = useState<IntroPhase>('intro-phase', () => 'idle')
  const contentRevealed = useState('intro-revealed', () => false)
  const fvLoaded = useState('intro-fv-loaded', () => false)
  const headerShown = useState('intro-header-shown', () => false)

  function lockScroll() {
    if (!import.meta.client) return
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })
  }

  function unlockScroll() {
    if (!import.meta.client) return
    document.documentElement.style.overflow = ''
    if (!document.body.hasAttribute('data-navopen')) {
      document.body.style.overflow = ''
    }
    document.removeEventListener('wheel', preventScroll)
    document.removeEventListener('touchmove', preventScroll)
  }

  function begin() {
    playing.value = true
    phase.value = 'cover'
    contentRevealed.value = false
    fvLoaded.value = false
    headerShown.value = false
  }

  function reveal() {
    contentRevealed.value = true
    fvLoaded.value = true
    headerShown.value = true
  }

  function finish() {
    reveal()
    playing.value = false
    phase.value = 'done'
    unlockScroll()
  }

  function skip() {
    finish()
  }

  return {
    playing,
    phase,
    contentRevealed,
    fvLoaded,
    headerShown,
    begin,
    reveal,
    finish,
    skip,
    lockScroll,
    unlockScroll,
  }
}
