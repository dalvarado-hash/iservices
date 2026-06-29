<script setup>
import Panel from './Panel.vue'
import Waitlist from './Waitlist.vue'

const stats = [
  { k: '21→7', v: 'sensors mapped to devices' },
  { k: '3 yr', v: 'price lock, published' },
  { k: '1', v: 'agent per site, outbound' },
]
</script>

<template>
  <Panel id="overview" label="overview // scout.status" dot="bg-emerald-400">
    <template #meta>
      <span class="hidden items-center gap-1.5 font-mono text-[11px] text-emerald-300 sm:inline-flex">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
        live
      </span>
    </template>

    <div class="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-300"
        >
          <span class="h-1 w-1 rounded-full bg-amber-300"></span>
          For MSPs leaving PRTG &amp; SolarWinds
        </span>

        <h1
          class="mt-5 text-balance text-[clamp(28px,4.4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white"
        >
          Leaving PRTG used to mean
          <span class="text-magenta line-through decoration-[3px]">rebuilding everything</span>.
          Now it takes <span class="text-grad">an afternoon</span>.
        </h1>

        <p class="mt-5 max-w-[58ch] text-[15.5px] leading-relaxed text-slate-400">
          Scout reads your PRTG export and rebuilds your whole network for you — devices, groups,
          thresholds, all of it. Monitor every client from one cloud. Priced
          <b class="font-semibold text-slate-100">per device, not per sensor.</b> Published, locked
          for 3 years.
        </p>

        <div class="mt-7">
          <Waitlist />
        </div>
      </div>

      <!-- right rail: compact stat readouts -->
      <div class="grid gap-3">
        <div
          v-for="stat in stats"
          :key="stat.k"
          class="glass flex items-baseline gap-3 rounded-lg px-4 py-3.5"
        >
          <span class="font-mono text-[22px] font-semibold tracking-tight text-grad">{{ stat.k }}</span>
          <span class="text-[12.5px] leading-snug text-slate-400">{{ stat.v }}</span>
        </div>
        <div
          class="glass flex items-center gap-2.5 rounded-lg px-4 py-3 font-mono text-[11.5px] text-slate-500"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,195,255,0.7)]"></span>
          cloud-hosted · no server to maintain
        </div>
      </div>
    </div>
  </Panel>
</template>
