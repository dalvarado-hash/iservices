<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'
import BentoTile from './BentoTile.vue'

/* ── EXACT pricing logic ported verbatim from the source landing ── */
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

function series(fn) {
  const p = []
  for (let x = 10; x <= 500; x += 20) { p.push({ x, y: fn(x) }) }
  return p
}

/* ── Reactive state ── */
const devices = ref(100)

const sVal = computed(() => scout(devices.value))
const pVal = computed(() => prtg(devices.value))
const wVal = computed(() => sw(devices.value))
const aVal = computed(() => auvik(devices.value))

const cScout = computed(() => fmt(sVal.value))
const cPrtg = computed(() => fmt(pVal.value))
const cSw = computed(() => fmt(wVal.value))
const cAuvik = computed(() => fmt(aVal.value))

const cPrtgX = computed(() =>
  prtgQuote(devices.value)
    ? 'quote required'
    : (pVal.value > sVal.value ? '+' + fmt(pVal.value - sVal.value) + ' vs Scout' : '/mo')
)
const cSwX = computed(() => (wVal.value > sVal.value ? '+' + fmt(wVal.value - sVal.value) + ' vs Scout' : '/mo'))
const cAuvikX = computed(() => (aVal.value > sVal.value ? '+' + fmt(aVal.value - sVal.value) + ' vs Scout' : '/mo'))

const saveLine = computed(() => {
  const d = devices.value
  const rival = Math.min(pVal.value, wVal.value, aVal.value)
  const saveYr = (rival - sVal.value) * 12
  return saveYr > 0
    ? 'At ' + d.toLocaleString() + ' devices, Scout runs about <b>' + fmt(saveYr) + '/year</b> under the next cheapest — published, no quote, locked for 3 years.'
    : '<b>Priced with the serious tools — but published, not quoted, and locked for 3 years.</b> No sensor counting, no renewal shock.'
})

/* ── Chart.js — created in onMounted, refreshed in watch ── */
const canvasRef = ref(null)
let chart = null

function markerData() {
  const d = devices.value
  return [{ x: d, y: 0 }, { x: d, y: 3600 }]
}

onMounted(() => {
  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Scout', data: series(scout), borderColor: '#a446f4', borderWidth: 3,
          pointRadius: 0, tension: 0.25, fill: true, backgroundColor: 'rgba(127,57,233,0.09)'
        },
        { label: 'PRTG', data: series(prtg), borderColor: '#FF5C6C', borderWidth: 1.8, borderDash: [5, 4], pointRadius: 0, stepped: true },
        { label: 'SolarWinds', data: series(sw), borderColor: '#5B9DF0', borderWidth: 1.8, borderDash: [2, 3], pointRadius: 0, tension: 0 },
        { label: 'Auvik', data: series(auvik), borderColor: '#FFB454', borderWidth: 1.8, borderDash: [8, 4], pointRadius: 0, tension: 0 },
        {
          label: '_marker', data: markerData(), borderColor: 'rgba(255,255,255,0.22)',
          borderWidth: 1.3, borderDash: [3, 3], pointRadius: 0, tension: 0, order: -1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: {
          type: 'linear', min: 10, max: 500,
          title: { display: true, text: 'Devices', color: '#6b7280', font: { size: 11, family: 'IBM Plex Mono' } },
          ticks: { color: '#6b7280', font: { size: 11, family: 'IBM Plex Mono' } },
          grid: { color: 'rgba(255,255,255,.05)' }
        },
        y: {
          title: { display: true, text: 'Cost / month', color: '#6b7280', font: { size: 11, family: 'IBM Plex Mono' } },
          ticks: { color: '#6b7280', font: { size: 11, family: 'IBM Plex Mono' }, callback: (v) => '$' + v.toLocaleString() },
          grid: { color: 'rgba(255,255,255,.05)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(11,11,19,0.95)',
          borderColor: 'rgba(164,70,244,0.4)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          padding: 10,
          titleFont: { family: 'IBM Plex Mono' },
          bodyFont: { family: 'IBM Plex Mono' },
          filter: (item) => item.dataset.label !== '_marker',
          callbacks: {
            title: (i) => i[0].parsed.x + ' devices',
            label: (c) => c.dataset.label + ': ' + fmt(c.parsed.y) + '/mo'
          }
        }
      }
    }
  })
})

watch(devices, () => {
  if (!chart) return
  chart.data.datasets[4].data = markerData()
  chart.update('none')
})

onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>

<template>
  <!-- ── LARGE tile: slider + chart + save line ── -->
  <BentoTile variant="feature" class="md:col-span-6 lg:col-span-8 lg:row-span-2" :delay="0.05">
    <div class="flex items-baseline justify-between gap-4 flex-wrap mb-4">
      <label for="dev" class="mono text-[11px] uppercase tracking-[0.16em] text-white/45">Devices monitored</label>
      <span class="mono text-3xl font-extrabold text-brand-soft tabular-nums">{{ devices.toLocaleString() }}</span>
    </div>
    <input
      id="dev"
      v-model.number="devices"
      class="range"
      type="range"
      min="10"
      max="500"
      step="10"
      aria-label="Devices monitored"
    />
    <div class="flex justify-between mono text-[10px] tracking-[0.14em] text-white/30 mt-2 mb-5">
      <span>10</span><span>500</span>
    </div>

    <!-- legend -->
    <div class="flex flex-wrap gap-x-5 gap-y-2 mb-3 mono text-[11px] uppercase tracking-[0.12em] text-white/50">
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-brand-light"></span>Scout</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-down"></span>PRTG</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded" style="background:#5B9DF0"></span>SolarWinds</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-amber"></span>Auvik</span>
    </div>

    <div class="relative w-full h-[260px] sm:h-[320px]">
      <canvas
        ref="canvasRef"
        role="img"
        aria-label="Monthly cost vs device count for Scout, PRTG, SolarWinds and Auvik. Scout stays lowest as devices scale."
      >Scout stays the lowest monthly cost as devices scale from 10 to 2000.</canvas>
    </div>

    <!-- save line: panel with a left accent rule (no gradient slab) -->
    <div
      class="saveline mt-5 rounded-lg border border-white/8 bg-white/[0.02] border-l-2 border-l-brand-light pl-5 pr-5 py-4 text-[14.5px] text-white/85"
      v-html="saveLine"
    ></div>
  </BentoTile>

  <!-- ── Scout headline price (the one bold solid-purple moment) ── -->
  <BentoTile variant="accent" class="md:col-span-3 lg:col-span-4 flex flex-col justify-center" :delay="0.1">
    <div class="mono text-[11px] uppercase tracking-[0.16em] text-white/75 mb-2">Scout · your price</div>
    <div class="mono text-5xl sm:text-6xl font-extrabold leading-none tracking-tight tabular-nums">{{ cScout }}</div>
    <div class="text-white/85 mt-2 text-sm">/mo · locked 3-yr · per device, not per sensor</div>
  </BentoTile>

  <!-- ── "per device, not per sensor" claim ── -->
  <BentoTile variant="feature" class="md:col-span-3 lg:col-span-4 flex flex-col justify-center" :delay="0.15">
    <div class="mono text-[11px] uppercase tracking-[0.16em] text-brand-soft mb-2">The model</div>
    <p class="text-2xl sm:text-[28px] font-extrabold leading-tight tracking-tight">
      Per <span class="accent-serif font-normal">device.</span><br />Not per sensor.
    </p>
    <p class="text-white/55 text-sm mt-3">21 sensors became 7 devices. You pay for the 7.</p>
  </BentoTile>

  <!-- ── competitor comparison (live) ── -->
  <BentoTile variant="panel" class="md:col-span-4 lg:col-span-8" :delay="0.1">
    <div class="mono text-[11px] uppercase tracking-[0.16em] text-white/40 mb-4">At {{ devices.toLocaleString() }} devices · monthly, the others</div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="rounded-lg p-4 border border-white/8 bg-white/[0.015]">
        <div class="text-[12.5px] text-white/45 mb-1.5">PRTG</div>
        <div class="mono text-2xl font-bold text-white/90 tabular-nums">{{ cPrtg }}</div>
        <div class="text-[11.5px] text-down/85 mt-0.5">{{ cPrtgX }}</div>
      </div>
      <div class="rounded-lg p-4 border border-white/8 bg-white/[0.015]">
        <div class="text-[12.5px] text-white/45 mb-1.5">SolarWinds</div>
        <div class="mono text-2xl font-bold text-white/90 tabular-nums">{{ cSw }}</div>
        <div class="text-[11.5px] text-down/85 mt-0.5">{{ cSwX }}</div>
      </div>
      <div class="rounded-lg p-4 border border-white/8 bg-white/[0.015]">
        <div class="text-[12.5px] text-white/45 mb-1.5">Auvik</div>
        <div class="mono text-2xl font-bold text-white/90 tabular-nums">{{ cAuvik }}</div>
        <div class="text-[11.5px] text-down/85 mt-0.5">{{ cAuvikX }}</div>
      </div>
    </div>
  </BentoTile>

  <!-- ── "locked 3 years" badge (custom lock icon, no emoji) ── -->
  <BentoTile variant="outline" class="md:col-span-2 lg:col-span-4 flex flex-col justify-center items-start" :delay="0.15">
    <span class="inline-flex items-center justify-center h-11 w-11 rounded-lg border border-brand-light/25 bg-brand-purple/10 text-brand-light mb-3">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.6" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        <circle cx="12" cy="15" r="1.4" fill="currentColor" />
      </svg>
    </span>
    <div class="text-xl font-extrabold tracking-tight leading-tight">Published pricing,<br />locked for 3 years</div>
    <div class="text-white/50 text-sm mt-2">No sensor counting. No renewal shock.</div>
  </BentoTile>

  <!-- ── footnotes ── -->
  <BentoTile variant="panel" class="md:col-span-4 lg:col-span-7" :delay="0.1">
    <p class="text-[11.5px] text-white/45 leading-relaxed">
      Scout: $2.50/device with volume bands ($2.00 over 100, $1.50 over 500), $29 min — published,
      locked for 3 years. PRTG: published tier prices (PRTG 500 $200/mo for 50 devices through
      PRTG 10000 $1,642/mo for 1,000) — the two largest tiers require “talk to sales.” SolarWinds:
      ~$7/node/mo. Auvik: ~$3/device/mo. Competitor figures from published pricing; estimates for
      comparison, not quotes.
    </p>
  </BentoTile>

  <!-- ── handoff CTA ── -->
  <BentoTile variant="feature" class="md:col-span-2 lg:col-span-5 flex flex-col justify-center" :delay="0.15">
    <div class="text-[15.5px] font-semibold text-white">Running more than 500 devices?</div>
    <div class="text-[13px] text-white/65 mt-1 max-w-[46ch]">
      Larger fleets get volume pricing and white-glove migration. Two-minute conversation, no sales runaround.
    </div>
    <a href="#waitlist" class="btn-ghost px-5 py-2.5 text-sm mt-4 self-start">Talk to us</a>
  </BentoTile>
</template>

<style scoped>
/* the <b> inside the v-html'd save line — solid brand accent, not a gradient */
.saveline :deep(b) {
  color: #c9a4ff;
  font-weight: 800;
}
</style>
