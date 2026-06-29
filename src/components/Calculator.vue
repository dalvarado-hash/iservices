<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useReveal } from '../composables/useReveal'

const { setRoot } = useReveal()

/* ---- pricing logic (ported verbatim from source) ---- */
const fmt = (n) => '$' + Math.round(n).toLocaleString()

function scout(d) {
  let cost = 0, rem = d
  const b1 = Math.min(rem, 100); cost += b1 * 2.50; rem -= b1
  const b2 = Math.min(rem, 400); cost += b2 * 2.00; rem -= b2
  cost += rem * 1.50
  return Math.max(cost, 29)
}
const PRTG = [[50, 200, false], [100, 358, false], [250, 742, false], [500, 1300, true], [1000, 1642, true]]
function prtg(d) { const t = PRTG.find((x) => x[0] >= d); if (!t) { return d * 1.642 } return t[1] }
function prtgQuote(d) { const t = PRTG.find((x) => x[0] >= d); return t ? t[2] : true }
function sw(d) { return d * 7.0 }
function auvik(d) { return d * 3.0 }

function series(fn) { const p = []; for (let x = 10; x <= 500; x += 20) { p.push({ x, y: fn(x) }) } return p }

/* ---- reactive state ---- */
const devices = ref(100)

const prices = reactive({ scout: '', prtg: '', sw: '', auvik: '', prtgX: '', swX: '', auvikX: '' })
const saveLine = ref('')

function recompute() {
  const d = +devices.value
  const s = scout(d), p = prtg(d), w = sw(d), a = auvik(d)
  prices.scout = fmt(s)
  prices.prtg = fmt(p)
  prices.sw = fmt(w)
  prices.auvik = fmt(a)
  prices.prtgX = prtgQuote(d) ? 'quote required' : (p > s ? '+' + fmt(p - s) + ' vs Scout' : '/mo')
  prices.swX = w > s ? '+' + fmt(w - s) + ' vs Scout' : '/mo'
  prices.auvikX = a > s ? '+' + fmt(a - s) + ' vs Scout' : '/mo'
  const rival = Math.min(p, w, a), saveYr = (rival - s) * 12
  saveLine.value = saveYr > 0
    ? 'At ' + d.toLocaleString() + ' devices, Scout runs about ' + fmt(saveYr) + '/year under the next cheapest — published, no quote, locked for 3 years.'
    : 'Priced with the serious tools — but published, not quoted, and locked for 3 years. No sensor counting, no renewal shock.'
}
recompute()

/* ---- chart ---- */
const canvasEl = ref(null)
let chart = null
let chartObs = null
let built = false

// Light-theme readable colors (dark-on-light)
const TXT = '#475569'        // slate-600 — axis titles, ticks
const GRID = 'rgba(15,23,42,.08)'
const SCOUT_COLOR = '#7F39E9' // brand purple
const PRTG_COLOR = '#F1005B'  // magenta
const SW_COLOR = '#0ea5e9'    // sky-500
const AUVIK_COLOR = '#f59e0b' // amber-500

const legend = [
  { label: 'Scout', color: SCOUT_COLOR, dash: false },
  { label: 'PRTG', color: PRTG_COLOR, dash: true },
  { label: 'SolarWinds', color: SW_COLOR, dash: true },
  { label: 'Auvik', color: AUVIK_COLOR, dash: true },
]

function build() {
  if (chart || !canvasEl.value) return
  chart = new Chart(canvasEl.value, {
    type: 'line',
    data: {
      datasets: [
        { label: 'Scout', data: series(scout), borderColor: SCOUT_COLOR, borderWidth: 2.8, pointRadius: 0, tension: 0.25 },
        { label: 'PRTG', data: series(prtg), borderColor: PRTG_COLOR, borderWidth: 2, borderDash: [5, 4], pointRadius: 0, stepped: true },
        { label: 'SolarWinds', data: series(sw), borderColor: SW_COLOR, borderWidth: 2, borderDash: [2, 3], pointRadius: 0, tension: 0 },
        { label: 'Auvik', data: series(auvik), borderColor: AUVIK_COLOR, borderWidth: 2, borderDash: [8, 4], pointRadius: 0, tension: 0 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: {
          type: 'linear', min: 10, max: 500,
          title: { display: true, text: 'Devices', color: TXT, font: { size: 11, family: 'Manrope' } },
          ticks: { color: TXT, font: { size: 11, family: 'IBM Plex Mono' } },
          grid: { color: GRID },
          border: { color: GRID },
        },
        y: {
          title: { display: true, text: 'Cost / month', color: TXT, font: { size: 11, family: 'Manrope' } },
          ticks: { color: TXT, font: { size: 11, family: 'IBM Plex Mono' }, callback: (v) => '$' + v.toLocaleString() },
          grid: { color: GRID },
          border: { color: GRID },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a2e',
          titleColor: '#ffffff',
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(127,57,233,.4)',
          borderWidth: 1,
          padding: 10,
          titleFont: { family: 'Manrope', weight: '700' },
          bodyFont: { family: 'IBM Plex Mono' },
          callbacks: {
            title: (i) => i[0].parsed.x + ' devices',
            label: (c) => c.dataset.label + ': ' + fmt(c.parsed.y) + '/mo',
          },
        },
      },
    },
  })
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) { build(); built = true; return }
  chartObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !built) { built = true; build(); chartObs.disconnect() }
    })
  }, { threshold: 0.2 })
  if (canvasEl.value) chartObs.observe(canvasEl.value)
})

watch(devices, () => {
  recompute()
  if (chart) chart.update('none')
})

onBeforeUnmount(() => {
  if (chartObs) chartObs.disconnect()
  if (chart) { chart.destroy(); chart = null }
})

const devOut = computed(() => Number(devices.value).toLocaleString())
</script>

<template>
  <!-- FULL-BLEED tinted band for the interactive moment -->
  <section :ref="setRoot" class="border-y border-slate-200 bg-surface-1 py-20 sm:py-24">
    <div class="reading-wide">
      <div class="mx-auto max-w-[680px] text-center">
        <p class="reveal font-mono text-[12px] uppercase tracking-[0.2em] text-brand">Now drag it to your number</p>
        <h2 class="reveal mt-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink text-balance" style="transition-delay: 60ms">
          See your exact price, locked.
        </h2>
      </div>

      <div class="reveal mx-auto mt-10 max-w-[820px] rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8" style="transition-delay: 100ms">
        <!-- slider -->
        <div class="mb-7">
          <div class="mb-2.5 flex items-baseline justify-between">
            <label for="dev" class="text-[13.5px] font-medium text-muted">Devices monitored</label>
            <span class="font-mono text-2xl font-bold text-ink">{{ devOut }}</span>
          </div>
          <input
            id="dev"
            v-model.number="devices"
            type="range"
            min="10"
            max="500"
            step="10"
            class="range-purple"
            aria-label="Devices monitored"
          />
          <div class="mt-1.5 flex justify-between font-mono text-[11px] text-muted-soft">
            <span>10</span><span>500</span>
          </div>
        </div>

        <!-- price cards -->
        <div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-xl border border-brand/30 bg-brand/[0.06] p-4 shadow-soft">
            <div class="mb-1.5 text-[12.5px] font-semibold text-brand">Scout</div>
            <div class="font-mono text-2xl font-bold text-brand">{{ prices.scout }}</div>
            <div class="mt-0.5 text-[11.5px] text-muted-soft">/mo &middot; 3-yr lock</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <div class="mb-1.5 text-[12.5px] text-muted-soft">PRTG</div>
            <div class="font-mono text-2xl font-bold text-ink">{{ prices.prtg }}</div>
            <div class="mt-0.5 text-[11.5px] text-muted-soft">{{ prices.prtgX }}</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <div class="mb-1.5 text-[12.5px] text-muted-soft">SolarWinds</div>
            <div class="font-mono text-2xl font-bold text-ink">{{ prices.sw }}</div>
            <div class="mt-0.5 text-[11.5px] text-muted-soft">{{ prices.swX }}</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <div class="mb-1.5 text-[12.5px] text-muted-soft">Auvik</div>
            <div class="font-mono text-2xl font-bold text-ink">{{ prices.auvik }}</div>
            <div class="mt-0.5 text-[11.5px] text-muted-soft">{{ prices.auvikX }}</div>
          </div>
        </div>

        <!-- legend -->
        <div class="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span v-for="item in legend" :key="item.label" class="flex items-center gap-2 text-[12.5px] text-muted">
            <span class="inline-block h-0.5 w-5 rounded-full" :class="item.dash ? 'opacity-90' : ''" :style="{ background: item.color }"></span>
            {{ item.label }}
          </span>
        </div>

        <!-- chart -->
        <div class="relative mb-1.5 h-[280px] w-full">
          <canvas
            ref="canvasEl"
            role="img"
            aria-label="Monthly cost vs device count for Scout, PRTG, SolarWinds and Auvik. Scout stays lowest as devices scale."
          >Scout stays the lowest monthly cost as devices scale from 10 to 2000.</canvas>
        </div>

        <!-- save line -->
        <div class="mt-4 rounded-xl border border-brand/20 bg-brand/[0.06] px-4 py-3.5 text-[14.5px] text-brand-deep">
          <b class="font-semibold text-brand">{{ saveLine }}</b>
        </div>

        <p class="mt-3.5 text-[11.5px] leading-relaxed text-muted-soft">
          Scout: $2.50/device with volume bands ($2.00 over 100, $1.50 over 500), $29 min &mdash; published, locked for 3 years.
          PRTG: published tier prices (PRTG 500 $200/mo for 50 devices through PRTG 10000 $1,642/mo for 1,000) &mdash; the two largest
          tiers require "talk to sales." SolarWinds: ~$7/node/mo. Auvik: ~$3/device/mo. Competitor figures from published
          pricing; estimates for comparison, not quotes.
        </p>

        <!-- handoff -->
        <div class="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-surface-1 px-5 py-5">
          <div>
            <div class="text-[15.5px] font-semibold text-ink">Running more than 500 devices?</div>
            <div class="mt-1 max-w-[46ch] text-[13px] text-muted">
              Larger fleets get volume pricing and white-glove migration. Two-minute conversation, no sales runaround.
            </div>
          </div>
          <a
            href="#waitlist"
            class="flex-none rounded-lg border border-brand/40 px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/[0.06]"
          >
            Talk to us
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
