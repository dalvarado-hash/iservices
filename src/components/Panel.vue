<script setup>
defineProps({
  /** mono label shown on the left of the panel header bar */
  label: { type: String, default: '' },
  /** small status text shown on the right of the header bar */
  meta: { type: String, default: '' },
  /** dot accent color for the header (tailwind bg-* class) */
  dot: { type: String, default: 'bg-signal-light' },
})
</script>

<template>
  <section class="panel scanline">
    <header class="panel-head">
      <span class="h-1.5 w-1.5 flex-none rounded-full" :class="dot"></span>
      <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
        {{ label }}
      </span>
      <span class="ml-1 h-px flex-1 bg-white/10"></span>
      <slot name="meta">
        <span v-if="meta" class="font-mono text-[11px] text-slate-500">{{ meta }}</span>
      </slot>
    </header>
    <div class="p-5 sm:p-6">
      <slot />
    </div>
  </section>
</template>
