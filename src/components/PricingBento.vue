<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'
import BentoTile from './BentoTile.vue'

/* ──────────────────────────────────────────────────────────────
   EXACT pricing logic ported verbatim from the source landing.
   ────────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────────
   Reactive state
   ────────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────────
   Chart.js — created in onMounted, refreshed in watch
   ────────────────────────────────────────────────────────────── */
const canvasRef = ref(null)
let chart = null

function markerData() {
  const d = devices.value
  return [{ x: d, y: 0 }, { x: d, y: 3600 }]
}

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  // bright cyan → purple → magenta gradient stroke for the Scout line
  const grad = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0)
  grad.addColorStop(0, '#00c3ff')
  grad.addColorStop(0.45, '#a446f4')
  grad.addColorStop(1, '#F1005B')

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Scout', data: series(scout), borderColor: grad, borderWidth: 3.4,
          pointRadius: 0, tension: 0.25,
          fill: true,
          backgroundColor: 'rgba(164,70,244,0.10)'
        },
        { label: 'PRTG', data: series(prtg), borderColor: '#F1005B', borderWidth: 2, borderDash: [5, 4], pointRadius: 0, stepped: true },
        { label: 'SolarWinds', data: series(sw), borderColor: '#00c3ff', borderWidth: 2, borderDash: [2, 3], pointRadius: 0, tension: 0 },
        { label: 'Auvik', data: series(auvik), borderColor: '#FFB454', borderWidth: 2, borderDash: [8, 4], pointRadius: 0, tension: 0 },
        {
          label: '_marker', data: markerData(), borderColor: 'rgba(255,255,255,0.5)',
          borderWidth: 1.5, borderDash: [3, 3], pointRadius: 0, tension: 0, order: -1
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
          title: { display: true, text: 'Devices', color: '#8A93A6', font: { size: 11, family: 'IBM Plex Mono' } },
          ticks: { color: '#8A93A6', font: { size: 11, family: 'IBM Plex Mono' } },
          grid: { color: 'rgba(138,147,166,.10)' }
        },
        y: {
          title: { display: true, text: 'Cost / month', color: '#8A93A6', font: { size: 11, family: 'IBM Plex Mono' } },
          ticks: { color: '#8A93A6', font: { size: 11, family: 'IBM Plex Mono' }, callback: (v) => '$' + v.toLocaleString() },
          grid: { color: 'rgba(138,147,166,.10)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,18,0.92)',
          borderColor: 'rgba(164,70,244,0.5)',
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

// move the vertical marker as the slider changes
watch(devices, () => {
  if (!chart) return
  chart.data.datasets[4].data = markerData()
  chart.update('none')
})

onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>

<template>
  <!-- ── LARGE hero tile: slider + chart + save line ── -->
  <BentoTile variant="glass" class="md:col-span-6 lg:col-span-8 lg:row-span-2" :delay="0.05">
    <!-- slider -->
    <div class="flex items-baseline justify-between gap-4 flex-wrap mb-4">
      <label for="dev" class="text-sm text-white/60">Devices monitored</label>
      <span class="font-mono text-3xl font-extrabold gradient-text-signature tabular-nums">{{ devices.toLocaleString() }}</span>
    </div>
    <input
      id="dev"
      v-model.number="devices"
      class="brand-range"
      type="range"
      min="10"
      max="500"
      step="10"
      aria-label="Devices monitored"
    />
    <div class="flex justify-between mono-label text-white/30 mt-2 mb-5">
      <span>10</span><span>500</span>
    </div>

    <!-- custom legend -->
    <div class="flex flex-wrap gap-x-5 gap-y-2 mb-3 mono-label text-white/50">
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded" style="background:linear-gradient(90deg,#a446f4,#F1005B)"></span>Scout</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-brand-magenta"></span>PRTG</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-brand-cyan"></span>SolarWinds</span>
      <span class="flex items-center gap-2"><span class="h-[3px] w-5 rounded bg-amber"></span>Auvik</span>
    </div>

    <!-- chart -->
    <div class="relative w-full h-[260px] sm:h-[320px]">
      <canvas
        ref="canvasRef"
        role="img"
        aria-label="Monthly cost vs device count for Scout, PRTG, SolarWinds and Auvik. Scout stays lowest as devices scale."
      >Scout stays the lowest monthly cost as devices scale from 10 to 2000.</canvas>
    </div>

    <!-- save line -->
    <div
      class="saveline mt-5 rounded-xl px-5 py-4 border border-brand-light/30 bg-gradient-to-r from-brand-purple/15 to-brand-magenta/10 text-[14.5px] text-white/85"
      v-html="saveLine"
    ></div>
  </BentoTile>

  <!-- ── Scout headline price stat (signature gradient) ── -->
  <BentoTile variant="signature" class="md:col-span-3 lg:col-span-4 flex flex-col justify-center" :delay="0.1">
    <div class="mono-label text-white/70 mb-2">Scout · your price</div>
    <div class="font-mono text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">{{ cScout }}</div>
    <div class="text-white/80 mt-2 text-sm">/mo · locked 3-yr · per device, not per sensor</div>
  </BentoTile>

  <!-- ── "per device, not per sensor" claim ── -->
  <BentoTile variant="gradient" class="md:col-span-3 lg:col-span-4 flex flex-col justify-center" :delay="0.15">
    <div class="mono-label text-brand-cyan mb-2">The model</div>
    <p class="text-2xl sm:text-[28px] font-extrabold leading-tight tracking-tight">
      Per <span class="gradient-text">device.</span><br />Not per sensor.
    </p>
    <p class="text-white/55 text-sm mt-3">21 sensors became 7 devices. You pay for the 7.</p>
  </BentoTile>

  <!-- ── Competitor comparison tile (live) ── -->
  <BentoTile variant="glass" class="md:col-span-4 lg:col-span-8" :delay="0.1">
    <div class="mono-label text-white/40 mb-4">At {{ devices.toLocaleString() }} devices · monthly, the others</div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="rounded-2xl p-4 border border-white/10 bg-white/[0.03]">
        <div class="text-[12.5px] text-white/45 mb-1.5">PRTG</div>
        <div class="font-mono text-2xl font-bold text-white/90">{{ cPrtg }}</div>
        <div class="text-[11.5px] text-down/80 mt-0.5">{{ cPrtgX }}</div>
      </div>
      <div class="rounded-2xl p-4 border border-white/10 bg-white/[0.03]">
        <div class="text-[12.5px] text-white/45 mb-1.5">SolarWinds</div>
        <div class="font-mono text-2xl font-bold text-white/90">{{ cSw }}</div>
        <div class="text-[11.5px] text-down/80 mt-0.5">{{ cSwX }}</div>
      </div>
      <div class="rounded-2xl p-4 border border-white/10 bg-white/[0.03]">
        <div class="text-[12.5px] text-white/45 mb-1.5">Auvik</div>
        <div class="font-mono text-2xl font-bold text-white/90">{{ cAuvik }}</div>
        <div class="text-[11.5px] text-down/80 mt-0.5">{{ cAuvikX }}</div>
      </div>
    </div>
  </BentoTile>

  <!-- ── "locked 3 years" badge tile ── -->
  <BentoTile variant="outline" class="md:col-span-2 lg:col-span-4 flex flex-col justify-center items-start" :delay="0.15">
    <div class="text-3xl mb-3" aria-hidden="true">🔒</div>
    <div class="text-xl font-extrabold tracking-tight leading-tight">Published pricing,<br />locked for 3 years</div>
    <div class="text-white/50 text-sm mt-2">No sensor counting. No renewal shock.</div>
  </BentoTile>

  <!-- ── footnotes (wide thin tile) ── -->
  <BentoTile variant="solid" class="md:col-span-4 lg:col-span-7" :delay="0.1">
    <p class="text-[11.5px] text-white/45 leading-relaxed">
      Scout: $2.50/device with volume bands ($2.00 over 100, $1.50 over 500), $29 min — published,
      locked for 3 years. PRTG: published tier prices (PRTG 500 $200/mo for 50 devices through
      PRTG 10000 $1,642/mo for 1,000) — the two largest tiers require “talk to sales.” SolarWinds:
      ~$7/node/mo. Auvik: ~$3/device/mo. Competitor figures from published pricing; estimates for
      comparison, not quotes.
    </p>
  </BentoTile>

  <!-- ── handoff CTA tile ── -->
  <BentoTile variant="gradient" class="md:col-span-2 lg:col-span-5 flex flex-col justify-center" :delay="0.15">
    <div class="text-[15.5px] font-semibold text-white">Running more than 500 devices?</div>
    <div class="text-[13px] text-white/65 mt-1 max-w-[46ch]">
      Larger fleets get volume pricing and white-glove migration. Two-minute conversation, no sales runaround.
    </div>
    <a href="#waitlist" class="btn-grad px-6 py-3 text-sm mt-4 self-start">Talk to us</a>
  </BentoTile>
</template>

<style scoped>
/* style the <b> inside the v-html'd save line with the signature gradient */
.saveline :deep(b) {
  background: linear-gradient(224.95deg, #a446f4 0%, #4138f3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: 800;
}
</style>
