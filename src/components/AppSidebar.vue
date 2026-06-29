<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const nav = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'migrate', label: 'Migration demo', icon: 'swap' },
  { id: 'pricing', label: 'Price calculator', icon: 'chart' },
  { id: 'switch', label: 'Why switch', icon: 'list' },
  { id: 'waitlist', label: 'Early access', icon: 'bolt' },
]

const active = ref('overview')
let observer = null

onMounted(() => {
  const sections = nav
    .map((n) => document.getElementById(n.id))
    .filter(Boolean)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  )
  sections.forEach((s) => observer.observe(s))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

function go(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <aside
    class="z-30 flex shrink-0 flex-col border-b border-white/10 bg-ink-deep/80 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-[240px] lg:border-b-0 lg:border-r"
  >
    <!-- wordmark -->
    <div class="flex items-center justify-between gap-3 px-5 py-4 lg:py-5">
      <a
        href="#overview"
        class="flex items-center gap-2.5"
        @click.prevent="go('overview')"
        aria-label="Impulse — Scout"
      >
        <span class="grid h-7 w-7 place-items-center rounded-md grad-brand shadow-[0_0_18px_rgba(127,57,233,0.55)]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="#fff" />
          </svg>
        </span>
        <span class="flex flex-col leading-none">
          <span class="text-[15px] font-extrabold tracking-tight text-white">Impulse</span>
          <span class="font-mono text-[10px] tracking-[0.18em] text-slate-500">SCOUT // CONSOLE</span>
        </span>
      </a>
      <!-- mobile CTA -->
      <a
        href="#waitlist"
        @click.prevent="go('waitlist')"
        class="grad-brand rounded-md px-3 py-1.5 text-[12.5px] font-semibold text-white lg:hidden"
        >Early access</a
      >
    </div>

    <!-- nav -->
    <nav
      class="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-2 lg:flex-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-3"
      aria-label="Sections"
    >
      <a
        v-for="item in nav"
        :key="item.id"
        :href="'#' + item.id"
        @click.prevent="go(item.id)"
        :aria-current="active === item.id ? 'true' : undefined"
        class="group flex flex-none items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors"
        :class="
          active === item.id
            ? 'bg-signal/15 text-white'
            : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
        "
      >
        <span
          class="grid h-5 w-5 flex-none place-items-center rounded-[5px] border transition-colors"
          :class="
            active === item.id
              ? 'border-signal-light/50 text-signal-light'
              : 'border-white/10 text-slate-500 group-hover:text-slate-300'
          "
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <template v-if="item.icon === 'grid'"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></template>
            <template v-else-if="item.icon === 'swap'"><path d="M7 16H3l4 4M3 16l4-4M17 8h4l-4-4M21 8l-4 4" /><path d="M7 16h11M17 8H6" /></template>
            <template v-else-if="item.icon === 'chart'"><path d="M3 3v18h18" /><path d="m7 14 4-5 3 3 5-7" /></template>
            <template v-else-if="item.icon === 'list'"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></template>
            <template v-else><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></template>
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <!-- footer block: status + CTA (desktop) -->
    <div class="hidden border-t border-white/10 p-3.5 lg:block">
      <div
        class="mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
      >
        <span class="h-2 w-2 flex-none rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse-dot"></span>
        <span class="text-[12px] text-slate-300">All systems operational</span>
      </div>
      <a
        href="#waitlist"
        @click.prevent="go('waitlist')"
        class="grad-brand block rounded-lg px-4 py-2.5 text-center text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(127,57,233,0.9)] transition-transform hover:-translate-y-px"
        >Get early access</a
      >
      <p class="mt-2.5 text-center font-mono text-[10px] tracking-wide text-slate-600">impulse.ky</p>
    </div>
  </aside>
</template>
