<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// ── Real data from an actual PRTG export — the POC made visible. ──
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
  { name: 'Probe Device', type: 'skip · PRTG’s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' },
  { name: 'PRTG Core Server', type: 'skip · PRTG’s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' }
]

// reactive visibility flags drive the staggered reveal
const sensorShown = reactive(sensors.map(() => false))
const deviceShown = reactive(devices.map(() => false))

const demoEl = ref(null)
let timers = []
let observer = null
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function clearTimers() {
  timers.forEach((t) => clearTimeout(t))
  timers = []
}

function run() {
  clearTimers()
  sensors.forEach((_, i) => { sensorShown[i] = false })
  devices.forEach((_, i) => { deviceShown[i] = false })

  if (reduceMotion) {
    // freeze: reveal everything immediately
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

onMounted(() => {
  // run when scrolled into view (once)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run()
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })
  if (demoEl.value) observer.observe(demoEl.value)
})

onBeforeUnmount(() => {
  clearTimers()
  if (observer) observer.disconnect()
})

const dotClass = { up: 'bg-signal', warn: 'bg-amber', down: 'bg-down' }
</script>

<template>
  <div
    ref="demoEl"
    class="relative w-full rounded-2xl overflow-hidden panel shadow-[0_40px_110px_-60px_rgba(0,0,0,0.9)]"
  >
    <!-- solid brand hairline top accent -->
    <div class="h-px w-full bg-brand-purple"></div>

    <!-- terminal-style bar -->
    <div class="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-white/[0.015]">
      <span class="h-2.5 w-2.5 rounded-full border border-white/15"></span>
      <span class="h-2.5 w-2.5 rounded-full border border-white/15"></span>
      <span class="h-2.5 w-2.5 rounded-full border border-white/15"></span>
      <span class="ml-3 mono text-xs text-white/40 truncate">
        scout migrate — your-client-prtg-export.xml<span class="cursor-blink" aria-hidden="true"></span>
      </span>
    </div>

    <!-- grid: PRTG export → consolidate → Scout devices -->
    <div class="grid md:grid-cols-[1fr_64px_1fr] items-stretch">
      <!-- PRTG column -->
      <div class="p-5">
        <h3 class="flex items-center justify-between mono-label text-white/40 mb-4">
          <span>PRTG export</span>
          <span class="font-mono normal-case tracking-normal text-down text-xs">21 sensors</span>
        </h3>
        <div class="space-y-1.5 max-h-[300px] md:max-h-none overflow-y-auto pr-1">
          <div
            v-for="(s, i) in sensors"
            :key="'s' + i"
            class="flex items-center gap-2.5 text-[12.5px] px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/8 transition-all duration-500"
            :class="sensorShown[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'"
          >
            <span class="h-1.5 w-1.5 rounded-full flex-none" :class="dotClass[s.s]"></span>
            <span class="text-white/75 truncate">{{ s.n }}</span>
          </div>
        </div>
      </div>

      <!-- middle arrow -->
      <div class="hidden md:flex flex-col items-center justify-center border-x border-white/8 bg-white/[0.02] text-white/40">
        <div class="text-2xl text-brand-light font-bold">→</div>
        <div class="mt-1.5 mono text-[10px] leading-tight text-center text-white/40">
          Scout<br />consolidates
        </div>
      </div>

      <!-- Scout column -->
      <div class="p-5 border-t md:border-t-0 border-white/8">
        <h3 class="flex items-center justify-between mono-label text-white/40 mb-4">
          <span>Scout devices</span>
          <span class="font-mono normal-case tracking-normal text-signal text-xs">7 devices</span>
        </h3>
        <div class="space-y-2.5">
          <div
            v-for="(d, i) in devices"
            :key="'d' + i"
            class="rounded-lg border px-3 py-2.5 transition-all duration-500"
            :class="[
              deviceShown[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5',
              d.skip ? 'opacity-50 bg-white/[0.02] border-white/8' : 'bg-white/[0.03] border-white/12'
            ]"
          >
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span class="font-semibold text-[13.5px] text-white">{{ d.name }}</span>
              <span
                class="text-[10.5px] rounded border px-1.5 py-px"
                :class="d.skip
                  ? 'text-white/40 border-white/15'
                  : (d.low ? 'text-amber border-amber/40' : 'text-signal border-signal/40')"
              >{{ d.type }}</span>
            </div>
            <div class="text-[11.5px] text-white/55 leading-relaxed">{{ d.aspects }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5 border-t border-white/8 bg-white/[0.02] text-[13px] text-white/55">
      <span>21 sensors → <b class="text-signal font-semibold">7 real devices</b>, mapped &amp; ready to confirm — no rebuild by hand.</span>
      <button
        class="font-mono text-xs text-white/55 hover:text-white border border-white/15 hover:border-white/35 rounded-md px-3 py-1.5 transition"
        @click="run"
      >↻ Replay</button>
    </div>
  </div>
</template>
