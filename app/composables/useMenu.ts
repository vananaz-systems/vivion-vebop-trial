export function useMenu() {
  const isOpen = useState('menu-open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  watch(isOpen, (open) => {
    if (!import.meta.client) return
    document.body.style.overflow = open ? 'hidden' : ''
    document.body.toggleAttribute('data-navopen', open)
  })

  return { isOpen, open, close, toggle }
}
