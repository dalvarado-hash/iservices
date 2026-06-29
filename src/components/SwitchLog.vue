<script setup>
import Panel from './Panel.vue'

const rows = [
  {
    n: '01',
    tag: 'migrate',
    color: 'text-signal-light',
    title: 'Switch without the rebuild',
    body: 'Drop in your PRTG export. Scout reads it, groups sensors into real devices, and hands you a plan to approve — not 2,000 settings to recreate by hand.',
  },
  {
    n: '02',
    tag: 'deploy',
    color: 'text-cyan',
    title: 'Outbound agent, nothing inbound',
    body: 'One lightweight agent per client site phones home to your cloud. No VPN into their network, no firewall tickets, no server for you or them to maintain.',
  },
  {
    n: '03',
    tag: 'report',
    color: 'text-amber-300',
    title: 'Reports your clients actually read',
    body: 'White-label network health reports per client, on a schedule. The deliverable that proves your value every month — built in, not bolted on.',
  },
]
</script>

<template>
  <Panel id="switch" label="why-switch // log" dot="bg-cyan" class="scroll-mt-6">
    <template #meta>
      <span class="font-mono text-[11px] text-slate-500">3 entries</span>
    </template>

    <div class="mb-1">
      <p class="font-mono text-[11.5px] uppercase tracking-[0.14em] text-slate-500">
        Why MSPs are switching
      </p>
      <h2 class="mt-1.5 max-w-[28ch] text-[clamp(20px,2.6vw,28px)] font-extrabold leading-tight tracking-[-0.02em] text-white">
        One agent per site. Every client. No server to host.
      </h2>
    </div>

    <div class="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
      <article
        v-for="r in rows"
        :key="r.n"
        class="group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 py-4 transition-colors hover:bg-white/[0.015] sm:grid-cols-[auto_minmax(0,16rem)_1fr] sm:gap-x-6"
      >
        <div class="flex items-baseline gap-2 font-mono">
          <span class="text-[20px] font-medium text-white/25 tabular-nums">{{ r.n }}</span>
          <span class="text-[11px] uppercase tracking-[0.12em]" :class="r.color">/ {{ r.tag }}</span>
        </div>
        <h4 class="col-start-2 self-center text-[15.5px] font-semibold tracking-[-0.01em] text-slate-50 sm:col-start-2">
          {{ r.title }}
        </h4>
        <p class="col-span-2 text-[13.5px] leading-relaxed text-slate-400 sm:col-span-1 sm:col-start-3">
          {{ r.body }}
        </p>
      </article>
    </div>
  </Panel>
</template>
