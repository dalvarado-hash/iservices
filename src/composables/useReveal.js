import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Adds the `is-in` class to any element carrying the `reveal` class once it
 * scrolls into view. Respects prefers-reduced-motion (reveals immediately).
 * Returns a ref-setter you bind to the container's root element.
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  let observer = null
  const containers = []

  const setRoot = (el) => {
    if (el) containers.push(el)
  }

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = []
    containers.forEach((root) => {
      const els = root.classList.contains('reveal') ? [root] : []
      root.querySelectorAll('.reveal').forEach((n) => els.push(n))
      els.forEach((n) => targets.push(n))
    })

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((n) => n.classList.add('is-in'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    targets.forEach((n) => observer.observe(n))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { setRoot }
}
