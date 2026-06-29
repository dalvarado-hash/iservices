<script setup>
import { computed } from 'vue'

const props = defineProps({
  // visual surface: panel | feature | accent | outline | bare
  variant: { type: String, default: 'panel' },
  // scroll-reveal entrance delay in seconds
  delay: { type: Number, default: 0 },
  // corner radius scale (different tiles, different radii — composed, not uniform)
  radius: { type: String, default: '2xl' }, // 2xl | xl | lg
  // disable inner padding when a child manages its own
  flush: { type: Boolean, default: false }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'feature':
      return 'panel-feature'
    case 'accent':
      return 'panel-accent text-white'
    case 'outline':
      return 'border border-white/10 bg-transparent'
    case 'bare':
      return ''
    case 'panel':
    default:
      return 'panel'
  }
})

const radiusClass = computed(
  () => ({ '2xl': 'rounded-2xl', xl: 'rounded-xl', lg: 'rounded-lg' }[props.radius] || 'rounded-2xl')
)

const tileStyle = computed(() => ({ animationDelay: props.delay ? props.delay + 's' : '0s' }))
</script>

<template>
  <div
    class="reveal relative overflow-hidden transition-colors duration-200 hover:border-white/20"
    :class="[variantClass, radiusClass, flush ? '' : 'p-6 sm:p-7']"
    :style="tileStyle"
  >
    <slot />
  </div>
</template>
