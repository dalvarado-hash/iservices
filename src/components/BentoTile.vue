<script setup>
import { computed } from 'vue'

const props = defineProps({
  // visual style of the tile
  variant: { type: String, default: 'glass' }, // glass | solid | gradient | signature | outline
  // optional scroll-reveal entrance delay in seconds
  delay: { type: Number, default: 0 },
  // disable the inner padding when a child manages its own
  flush: { type: Boolean, default: false }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'solid':
      return 'bg-ink-2 border border-white/8'
    case 'gradient':
      return 'border border-brand-light/30 bg-gradient-to-br from-brand-purple/25 via-brand-blue/15 to-brand-magenta/10'
    case 'signature':
      return 'border border-transparent text-white'
    case 'outline':
      return 'border border-white/12 bg-transparent'
    case 'glass':
    default:
      return 'glass'
  }
})

const tileStyle = computed(() => {
  const s = { animationDelay: props.delay ? props.delay + 's' : '0s' }
  if (props.variant === 'signature') {
    s.background = 'linear-gradient(224.95deg,#a446f4,#4138f3)'
  }
  return s
})
</script>

<template>
  <div
    class="reveal relative rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_30px_90px_-50px_rgba(164,70,244,0.8)]"
    :class="[variantClass, flush ? '' : 'p-6 sm:p-7']"
    :style="tileStyle"
  >
    <slot />
  </div>
</template>
