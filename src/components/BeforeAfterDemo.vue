<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'

// Real data from an actual PRTG export — this is the POC made visible.
// (Logic reused verbatim from the verified MigrationDemo; re-laid-out as a
// vertical BEFORE -> AFTER editorial figure.)
const sensors = [
  { n: 'System Health', s: 'up' }, { n: 'Core Health', s: 'up' }, { n: 'Probe Health', s: 'up' },
  { n: 'Disk Free', s: 'up' }, { n: 'Killer Wi-Fi 6 AX1650i', s: 'up' },
  { n: 'Core Health (Autonomous)', s: 'up' }, { n: 'HTTP', s: 'up' },
  { n: 'Ping v2', s: 'up' }, { n: 'SNMP Uptime v2', s: 'up' }, { n: 'EEPS2 Traffic', s: 'up' },
  { n: 'Memory: Storage RAM', s: 'up' }, { n: 'SSL Security Check', s: 'warn' },
  { n: 'SSL Certificate Sensor', s: 'warn' }, { n: 'Ping v2 (.30)', s: 'down' },
  { n: 'HTTP v2', s: 'up' }, { n: 'HTTPS v2', s: 'up' }, { n: 'Ping v2 (.90)', s: 'up' },
  { n: 'Ping v2 (gw)', s: 'up' }, { n: 'Pages Printed Diff', s: 'up' },
  { n: 'Pages Printed Total', s: 'up' }, { n: 'DNS v2', s: 'down' }
]
const devices = [
  { name: 'EPSOND1C173', type: 'printer', low: false, aspects: 'reachability · uptime · throughput · memory · SSL check · cert expiry · HTTP/S · page counts' },
  { name: '192.168.1.1 (gateway)', type: 'gateway/router', low: false, aspects: 'reachability · DNS check' },
  { name: '192.168.1.30', type: 'unidentified host', low: true, aspects: 'reachability — Scout discovery will identify this' },
  { name: '192.168.1.90', type: 'unidentified host', low: true, aspects: 'reachability — Scout discovery will identify this' },
  { name: 'Internet check', type: 'synthetic', low: false, aspects: 'HTTP connectivity' },
  { name: 'Probe Device', type: 'skip · PRTG\'s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' },
  { name: 'PRTG Core Server', type: 'skip · PRTG\'s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' }
]

const sensorShown = reactive(sensors.map(() => false))
const deviceShown = reactive(devices.map(() => false))
const root = ref(null)

let timers = []
let started = false
const clearTimers = () => { timers.forEach(clearTimeout); timers = [] }
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function run() {
  clearTimers()
  sensors.forEach((_, i) => { sensorShown[i] = false })
  devices.forEach((_, i) => { deviceShown[i] = false })

  if (prefersReduced()) {
    sensors.forEach((_, i) => { sensorShown[i] = true })
    devices.forEach((_, i) => { deviceShown[i] = true })
    return
  }

  sensors.forEach((_, i) => {
    timers.push(setTimeout(() => { sensorShown[i] = true }, 60 * i))
  })
  const startDev = sensors.length * 60 + 250
  devices.forEach((_, i) => {
    timers.push(setTimeout(() => { deviceShown[i] = true }, startDev + 150 * i))
  })
}

const dotClass = { up: 'bg-emerald-500', warn: 'bg-amber-500', down: 'bg-rose-500' }

let obs = null
onMounted(() => {
  if (!('IntersectionObserver' in window)) { run(); started = true; return }
  obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !started) { started = true; run(); obs.disconnect() }
    })
  }, { threshold: 0.3 })
  if (root.value) obs.observe(root.value)
})
onBeforeUnmount(() => { clearTimers(); if (obs) obs.disconnect() })
</script>

<template>
  <!-- FULL-BLEED tinted band -->
  <section ref="root" class="border-y border-slate-200 bg-surface-1 py-20 sm:py-24">
    <figure class="reading-wide m-0">
      <!-- figure intro, kept in the narrow voice -->
      <figcaption class="mx-auto max-w-[680px] text-center">
        <p class="font-mono text-[12px] uppercase tracking-[0.2em] text-brand">Figure 01 &mdash; The migration</p>
        <h2 class="mt-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink text-balance">
          One real PRTG export. Watch it become a clean device list.
        </h2>
        <p class="mx-auto mt-4 max-w-[54ch] text-[16px] leading-relaxed text-muted">
          This is a live read of an actual client export &mdash; not a mock-up. Scout groups the noise
          into the machines that actually exist.
        </p>
      </figcaption>

      <!-- BEFORE block -->
      <div class="mx-auto mt-12 max-w-[760px]">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div class="flex items-center justify-between gap-3 border-b border-slate-200 bg-surface-2 px-5 py-3">
            <span class="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-soft">Before &mdash; PRTG export</span>
            <span class="font-mono text-[12.5px] font-semibold text-rose-500">21 sensors</span>
          </div>
          <ul class="grid grid-cols-1 gap-1.5 p-5 sm:grid-cols-2">
            <li
              v-for="(s, i) in sensors"
              :key="s.n + i"
              class="flex items-center gap-2 rounded-md border border-slate-100 bg-surface-1 px-2.5 py-1.5 text-[12.5px] transition-all duration-300"
              :class="sensorShown[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'"
            >
              <span class="h-1.5 w-1.5 flex-none rounded-full" :class="dotClass[s.s]"></span>
              <span class="truncate text-slate-600">{{ s.n }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- the downward consolidation beat -->
      <div class="flex flex-col items-center py-7" aria-hidden="true">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-white text-2xl text-brand shadow-soft"
        >
          &darr;
        </div>
        <p class="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-brand-deep">Scout consolidates</p>
      </div>

      <!-- AFTER block -->
      <div class="mx-auto max-w-[760px]">
        <div class="overflow-hidden rounded-2xl border border-brand/25 bg-white shadow-lift">
          <div class="flex items-center justify-between gap-3 border-b border-slate-200 bg-brand/[0.05] px-5 py-3">
            <span class="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-soft">After &mdash; Scout devices</span>
            <span class="font-mono text-[12.5px] font-semibold text-brand">7 devices</span>
          </div>
          <ul class="grid grid-cols-1 gap-2.5 p-5 sm:grid-cols-2">
            <li
              v-for="(d, i) in devices"
              :key="d.name + i"
              class="rounded-lg border border-slate-200 bg-surface-1 px-3 py-2.5 transition-all duration-500"
              :class="[
                deviceShown[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5',
                d.skip ? 'opacity-60' : ''
              ]"
            >
              <div class="mb-1 flex flex-wrap items-center gap-2">
                <span class="text-[13.5px] font-semibold text-ink">{{ d.name }}</span>
                <span
                  class="rounded border px-1.5 py-px text-[10.5px]"
                  :class="d.skip
                    ? 'border-slate-300 text-muted-soft'
                    : d.low
                      ? 'border-amber-300 text-amber-600'
                      : 'border-brand/30 text-brand'"
                >{{ d.type }}</span>
              </div>
              <div class="text-[11.5px] leading-relaxed text-muted-soft">{{ d.aspects }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- figure footer / caption -->
      <div class="mx-auto mt-8 flex max-w-[760px] flex-wrap items-center justify-between gap-3">
        <p class="text-[14px] text-muted">
          21 sensors &rarr; <b class="font-semibold text-brand">7 real devices</b>, mapped &amp; ready to
          confirm &mdash; no rebuild by hand.
        </p>
        <button
          type="button"
          @click="run"
          class="rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs text-muted-soft transition-colors hover:border-brand/40 hover:text-brand"
        >
          &#8635; Replay
        </button>
      </div>
    </figure>
  </section>
</template>
