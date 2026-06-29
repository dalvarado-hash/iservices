<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import Panel from './Panel.vue'

/* ---- exact pricing logic, ported verbatim from the source ---- */
const fmt = (n) => '$' + Math.round(n).toLocaleString()

function scout(d) {
  let cost = 0,
    rem = d
  const b1 = Math.min(rem, 100)
  cost += b1 * 2.5
  rem -= b1
  const b2 = Math.min(rem, 400)
  cost += b2 * 2.0
  rem -= b2
  cost += rem * 1.5
  return Math.max(cost, 29)
}
const PRTG = [
  [50, 200, false],
  [100, 358, false],
  [250, 742, false],
  [500, 1300, true],
  [1000, 1642, true],
]
function prtg(d) {
  const t = PRTG.find((x) => x[0] >= d)
  if (!t) {
    return d * 1.642
  }
  return t[1]
}
function prtgQuote(d) {
  const t = PRTG.find((x) => x[0] >= d)
  return t ? t[2] : true
}
function sw(d) {
  return d * 7.0
}
function auvik(d) {
  return d * 3.0
}
function series(fn) {
  const p = []
  for (let x = 10; x <= 500; x += 20) {
    p.push({ x, y: fn(x) })
  }
  return p
}

/* ---- reactive state ---- */
const devices = ref(100)
const canvas = ref(null)
let chart = null
let observer = null

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const s = computed(() => scout(devices.value))
const p = computed(() => prtg(devices.value))
const w = computed(() => sw(devices.value))
const a = computed(() => auvik(devices.value))

const cScout = computed(() => fmt(s.value))
const cPrtg = computed(() => fmt(p.value))
const cSw = computed(() => fmt(w.value))
const cAuvik = computed(() => fmt(a.value))

const cPrtgX = computed(() =>
  prtgQuote(devices.value)
    ? 'quote required'
    : p.value > s.value
      ? '+' + fmt(p.value - s.value) + ' vs Scout'
      : '/mo',
)
const cSwX = computed(() =>
  w.value > s.value ? '+' + fmt(w.value - s.value) + ' vs Scout' : '/mo',
)
const cAuvikX = computed(() =>
  a.value > s.value ? '+' + fmt(a.value - s.value) + ' vs Scout' : '/mo',
)

const saveLine = computed(() => {
  const rival = Math.min(p.value, w.value, a.value)
  const saveYr = (rival - s.value) * 12
  return saveYr > 0
    ? '<b>At ' +
        devices.value.toLocaleString() +
        ' devices, Scout runs about ' +
        fmt(saveYr) +
        '/year under the next cheapest</b> — published, no quote, locked for 3 years.'
    : '<b>Priced with the serious tools — but published, not quoted, and locked for 3 years.</b> No sensor counting, no renewal shock.'
})

const cards = computed(() => [
  { name: 'Scout', cost: cScout.value, sub: '/mo · 3-yr lock', us: true, color: '#a446f4' },
  { name: 'PRTG', cost: cPrtg.value, sub: cPrtgX.value, us: false, color: '#F1005B' },
  { name: 'SolarWinds', cost: cSw.value, sub: cSwX.value, us: false, color: '#00c3ff' },
  { name: 'Auvik', cost: cAuvik.value, sub: cAuvikX.value, us: false, color: '#FFB454' },
])

/* ---- chart ---- */
function build() {
  if (!canvas.value || chart) return
  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      datasets: [
        { label: 'Scout', data: series(scout), borderColor: '#a446f4', backgroundColor: 'rgba(164,70,244,0.10)', borderWidth: 2.6, pointRadius: 0, tension: 0.25, fill: true },
        { label: 'PRTG', data: series(prtg), borderColor: '#F1005B', borderWidth: 2, borderDash: [5, 4], pointRadius: 0, stepped: true },
        { label: 'SolarWinds', data: series(sw), borderColor: '#00c3ff', borderWidth: 2, borderDash: [2, 3], pointRadius: 0, tension: 0 },
        { label: 'Auvik', data: series(auvik), borderColor: '#FFB454', borderWidth: 2, borderDash: [8, 4], pointRadius: 0, tension: 0 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: reduceMotion ? false : { duration: 700 },
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: {
          type: 'linear',
          min: 10,
          max: 500,
          title: { display: true, text: 'Devices', color: '#94a3b8', font: { size: 11 } },
          ticks: { color: '#94a3b8', font: { size: 11 } },
          grid: { color: 'rgba(148,163,184,0.10)' },
          border: { color: 'rgba(148,163,184,0.18)' },
        },
        y: {
          title: { display: true, text: 'Cost / month', color: '#94a3b8', font: { size: 11 } },
          ticks: { color: '#94a3b8', font: { size: 11 }, callback: (v) => '$' + v.toLocaleString() },
          grid: { color: 'rgba(148,163,184,0.10)' },
          border: { color: 'rgba(148,163,184,0.18)' },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,18,0.92)',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          titleColor: '#f1f5f9',
          bodyColor: '#cbd5e1',
          padding: 10,
          callbacks: {
            title: (i) => i[0].parsed.x + ' devices',
            label: (c) => c.dataset.label + ': ' + fmt(c.parsed.y) + '/mo',
          },
        },
      },
    },
  })
}

// Mirror the source: redraw on slider change (datasets are static, so 'none').
watch(devices, () => {
  if (chart) chart.update('none')
})

const legend = [
  { label: 'Scout', color: '#a446f4', solid: true },
  { label: 'PRTG', color: '#F1005B', solid: false },
  { label: 'SolarWinds', color: '#00c3ff', solid: false },
  { label: 'Auvik', color: '#FFB454', solid: false },
]

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          build()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 },
  )
  if (canvas.value) observer.observe(canvas.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (chart) {
    chart.destroy()
    chart = null
  }
})
</script>

<template>
  <Panel id="pricing" label="pricing // cost-model" class="scroll-mt-6">
    <template #meta>
      <span class="font-mono text-[11px] text-slate-500">published · no quote</span>
    </template>

    <div class="mb-1">
      <p class="font-mono text-[11.5px] uppercase tracking-[0.14em] text-slate-500">
        And it’s cheaper too — published, no quote
      </p>
      <h2 class="mt-1.5 max-w-[26ch] text-[clamp(20px,2.6vw,28px)] font-extrabold leading-tight tracking-[-0.02em] text-white">
        Drag it to your number. See your exact price, locked.
      </h2>
    </div>

    <!-- control bar across the top -->
    <div class="mt-5 flex flex-col gap-3 rounded-lg border border-white/10 bg-black/25 px-4 py-3.5 sm:flex-row sm:items-center">
      <label for="dev" class="flex-none font-mono text-[12px] uppercase tracking-[0.12em] text-slate-400"
        >Devices monitored</label
      >
      <input
        id="dev"
        v-model.number="devices"
        type="range"
        min="10"
        max="500"
        step="10"
        aria-label="Devices monitored"
        class="slider order-last w-full sm:order-none sm:flex-1"
      />
      <span class="flex-none font-mono text-[20px] font-semibold text-white">{{ devices.toLocaleString() }}</span>
    </div>

    <!-- main widget: chart left ~60%, cards stacked right ~40% -->
    <div class="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <!-- chart -->
      <div class="glass flex flex-col rounded-lg p-3">
        <div class="mb-2 flex flex-wrap gap-x-4 gap-y-1.5 px-1 text-[11.5px] text-slate-400">
          <span v-for="l in legend" :key="l.label" class="inline-flex items-center gap-1.5">
            <span
              class="inline-block h-0.5 w-4 rounded-full"
              :style="{ backgroundColor: l.color, opacity: l.solid ? 1 : 0.85 }"
            ></span>
            {{ l.label }}
          </span>
        </div>
        <div class="relative h-[260px] w-full flex-1 sm:h-[320px]">
          <canvas
            ref="canvas"
            role="img"
            aria-label="Monthly cost vs device count for Scout, PRTG, SolarWinds and Auvik. Scout stays lowest as devices scale."
            >Scout stays the lowest monthly cost as devices scale from 10 to 2000.</canvas
          >
        </div>
      </div>

      <!-- stacked price cards -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <div
          v-for="c in cards"
          :key="c.name"
          class="flex items-center justify-between rounded-lg border px-4 py-3.5"
          :class="c.us ? 'border-signal-light/40 bg-signal/10' : 'border-white/10 bg-white/[0.02]'"
        >
          <div class="flex items-center gap-2.5">
            <span class="h-2.5 w-2.5 flex-none rounded-full" :style="{ backgroundColor: c.color }"></span>
            <div>
              <div class="text-[12.5px]" :class="c.us ? 'text-signal-light' : 'text-slate-500'">
                {{ c.name }}
              </div>
              <div class="text-[11px] text-slate-500">{{ c.sub }}</div>
            </div>
          </div>
          <div
            class="font-mono text-[22px] font-semibold tracking-tight"
            :class="c.us ? 'text-signal-light' : 'text-slate-100'"
          >
            {{ c.cost }}
          </div>
        </div>
      </div>
    </div>

    <!-- save line -->
    <div
      class="mt-4 rounded-lg border border-signal-light/30 bg-signal/10 px-4 py-3.5 text-[14px] text-slate-200 [&_b]:font-semibold [&_b]:text-signal-light"
      v-html="saveLine"
    ></div>

    <!-- footnote (preserved verbatim) -->
    <p class="mt-3 text-[11.5px] leading-relaxed text-slate-500">
      Scout: $2.50/device with volume bands ($2.00 over 100, $1.50 over 500), $29 min — published,
      locked for 3 years. PRTG: published tier prices (PRTG 500 $200/mo for 50 devices through PRTG
      10000 $1,642/mo for 1,000) — the two largest tiers require “talk to sales.” SolarWinds:
      ~$7/node/mo. Auvik: ~$3/device/mo. Competitor figures from published pricing; estimates for
      comparison, not quotes.
    </p>

    <!-- handoff -->
    <div class="glass mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg p-4">
      <div>
        <div class="text-[15px] font-semibold text-white">Running more than 500 devices?</div>
        <div class="mt-1 max-w-[46ch] text-[13px] text-slate-400">
          Larger fleets get volume pricing and white-glove migration. Two-minute conversation, no
          sales runaround.
        </div>
      </div>
      <a
        href="#waitlist"
        class="flex-none rounded-lg border border-signal-light/40 px-5 py-2.5 text-[14px] font-semibold text-signal-light transition-colors hover:bg-signal/10"
        >Talk to us</a
      >
    </div>
  </Panel>
</template>
