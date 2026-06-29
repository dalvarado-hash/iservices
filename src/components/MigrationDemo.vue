<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// Real data from an actual PRTG export — this is the POC made visible.
const sensors = [
  { n: 'System Health', s: 'up' }, { n: 'Core Health', s: 'up' }, { n: 'Probe Health', s: 'up' },
  { n: 'Disk Free', s: 'up' }, { n: 'Killer Wi-Fi 6 AX1650i', s: 'up' },
  { n: 'Core Health (Autonomous)', s: 'up' }, { n: 'HTTP', s: 'up' },
  { n: 'Ping v2', s: 'up' }, { n: 'SNMP Uptime v2', s: 'up' }, { n: 'EEPS2 Traffic', s: 'up' },
  { n: 'Memory: Storage RAM', s: 'up' }, { n: 'SSL Security Check', s: 'warn' },
  { n: 'SSL Certificate Sensor', s: 'warn' }, { n: 'Ping v2 (.30)', s: 'down' },
  { n: 'HTTP v2', s: 'up' }, { n: 'HTTPS v2', s: 'up' }, { n: 'Ping v2 (.90)', s: 'up' },
  { n: 'Ping v2 (gw)', s: 'up' }, { n: 'Pages Printed Diff', s: 'up' },
  { n: 'Pages Printed Total', s: 'up' }, { n: 'DNS v2', s: 'down' },
]
const devices = [
  { name: 'EPSOND1C173', type: 'printer', low: false, aspects: 'reachability · uptime · throughput · memory · SSL check · cert expiry · HTTP/S · page counts' },
  { name: '192.168.1.1 (gateway)', type: 'gateway/router', low: false, aspects: 'reachability · DNS check' },
  { name: '192.168.1.30', type: 'unidentified host', low: true, aspects: 'reachability — Scout discovery will identify this' },
  { name: '192.168.1.90', type: 'unidentified host', low: true, aspects: 'reachability — Scout discovery will identify this' },
  { name: 'Internet check', type: 'synthetic', low: false, aspects: 'HTTP connectivity' },
  { name: 'Probe Device', type: 'skip · PRTG’s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' },
  { name: 'PRTG Core Server', type: 'skip · PRTG’s own host', low: false, skip: true, aspects: 'PRTG self-monitoring — not migrated' },
]

const sensorShown = reactive(sensors.map(() => false))
const deviceShown = reactive(devices.map(() => false))

const root = ref(null)
let timers = []
let observer = null

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const dotClass = {
  up: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]',
  warn: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
  down: 'bg-magenta shadow-[0_0_8px_rgba(241,0,91,0.7)]',
}

function clearTimers() {
  timers.forEach((t) => clearTimeout(t))
  timers = []
}

function run() {
  clearTimers()

  if (reduceMotion) {
    sensors.forEach((_, i) => (sensorShown[i] = true))
    devices.forEach((_, i) => (deviceShown[i] = true))
    return
  }

  sensors.forEach((_, i) => (sensorShown[i] = false))
  devices.forEach((_, i) => (deviceShown[i] = false))

  sensors.forEach((_, i) => {
    timers.push(setTimeout(() => (sensorShown[i] = true), 60 * i))
  })
  const startDev = sensors.length * 60 + 250
  devices.forEach((_, i) => {
    timers.push(setTimeout(() => (deviceShown[i] = true), startDev + 150 * i))
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 },
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  clearTimers()
  if (observer) observer.disconnect()
})
</script>

<template>
  <section
    id="migrate"
    ref="root"
    class="panel overflow-hidden scroll-mt-6"
  >
    <!-- terminal title bar -->
    <header class="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5">
      <span class="h-3 w-3 rounded-full bg-magenta/70"></span>
      <span class="h-3 w-3 rounded-full bg-amber-400/70"></span>
      <span class="h-3 w-3 rounded-full bg-emerald-400/70"></span>
      <span class="ml-3 truncate font-mono text-[12px] text-slate-500">
        impulse@scout:~$ scout migrate <span class="text-slate-300">your-client-prtg-export.xml</span>
      </span>
      <span class="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.16em] text-signal-light sm:inline">
        consolidating
      </span>
    </header>

    <!-- console command echo -->
    <div class="border-b border-white/[0.06] bg-black/20 px-4 py-2 font-mono text-[11.5px] text-slate-500">
      <span class="text-emerald-400">✓</span> parsed export · grouping sensors into real devices
      <span class="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-signal-light animate-blink" aria-hidden="true"></span>
    </div>

    <!-- migration grid -->
    <div class="grid grid-cols-1 items-stretch md:grid-cols-[1fr_72px_1.1fr]">
      <!-- PRTG export -->
      <div class="p-5">
        <h3 class="mb-3.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span>PRTG export</span>
          <span class="rounded border border-magenta/40 px-1.5 py-px text-magenta">21 sensors</span>
        </h3>
        <div>
          <div
            v-for="(s, i) in sensors"
            :key="s.n + i"
            class="mb-1.5 flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 font-mono text-[12px] transition-all duration-500"
            :class="sensorShown[i] ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'"
          >
            <span class="h-1.5 w-1.5 flex-none rounded-full" :class="dotClass[s.s]"></span>
            <span class="truncate text-slate-300">{{ s.n }}</span>
          </div>
        </div>
      </div>

      <!-- middle pipe -->
      <div
        class="hidden flex-col items-center justify-center gap-2 border-x border-white/10 bg-black/20 text-slate-500 md:flex"
      >
        <div class="text-2xl text-signal-light">→</div>
        <div class="text-center font-mono text-[9.5px] uppercase leading-tight tracking-wider">
          Scout<br />consolidates
        </div>
      </div>

      <!-- Scout devices -->
      <div class="border-t border-white/10 p-5 md:border-l-0 md:border-t-0">
        <h3 class="mb-3.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span>Scout devices</span>
          <span class="rounded border border-signal-light/50 px-1.5 py-px text-signal-light">7 devices</span>
        </h3>
        <div>
          <div
            v-for="(d, i) in devices"
            :key="d.name + i"
            class="mb-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 transition-all duration-500"
            :class="[
              deviceShown[i] ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0',
              d.skip ? 'opacity-50' : '',
            ]"
          >
            <div class="mb-1 flex items-center gap-2">
              <span class="text-[13.5px] font-semibold text-slate-50">{{ d.name }}</span>
              <span
                class="rounded border px-1.5 py-px font-mono text-[10.5px]"
                :class="
                  d.skip
                    ? 'border-white/10 text-slate-500'
                    : d.low
                      ? 'border-amber-500/40 text-amber-400'
                      : 'border-signal-light/40 text-signal-light'
                "
                >{{ d.type }}</span
              >
            </div>
            <div class="text-[11.5px] leading-relaxed text-slate-400">{{ d.aspects }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <footer
      class="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/30 px-4 py-3.5 text-[13px] text-slate-400"
    >
      <span
        >21 sensors → <b class="font-semibold text-signal-light">7 real devices</b>, mapped &amp;
        ready to confirm — no rebuild by hand.</span
      >
      <button
        type="button"
        @click="run"
        class="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[12px] text-slate-400 transition-colors hover:border-signal-light/50 hover:text-white"
      >
        ↻ Replay
      </button>
    </footer>
  </section>
</template>
