<script setup>
import BentoTile from './BentoTile.vue'

// bespoke stroke icons (24px, 1.6 weight) — no emoji, no stock glyphs
const reasons = [
  {
    idx: '01',
    label: 'Migrate',
    title: 'Switch without the rebuild',
    body: 'Drop in your PRTG export. Scout reads it, groups sensors into real devices, and hands you a plan to approve — not 2,000 settings to recreate by hand.',
    icon: 'M4 6h5c4 0 4 6 8 6M4 18h5c4 0 4-6 8-6M16 8l3.2 4-3.2 4'
  },
  {
    idx: '02',
    label: 'Deploy',
    title: 'Outbound agent, nothing inbound',
    body: 'One lightweight agent per client site phones home to your cloud. No VPN into their network, no firewall tickets, no server for you or them to maintain.',
    icon: 'M9.5 14.5a6 6 0 0 1 0 7M13 11a12 12 0 0 1 0 14'
  },
  {
    idx: '03',
    label: 'Report',
    title: 'Reports your clients actually read',
    body: 'White-label network health reports per client, on a schedule. The deliverable that proves your value every month — built in, not bolted on.',
    icon: 'M6 3h9l4 4v14H6zM15 3v4h4M9 16.5l2.6-3 2 2L17 10.5'
  }
]
</script>

<template>
  <BentoTile
    v-for="(r, i) in reasons"
    :key="r.idx"
    variant="panel"
    class="md:col-span-2 lg:col-span-4"
    :delay="0.05 + i * 0.07"
  >
    <div class="flex items-center justify-between mb-5">
      <span class="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-brand-light/25 bg-brand-purple/10 text-brand-light">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle v-if="r.idx === '02'" cx="6" cy="18" r="2.1" fill="currentColor" />
          <path :d="r.icon" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="mono text-[11px] tracking-[0.16em] text-white/30">{{ r.idx }} · {{ r.label }}</span>
    </div>
    <h4 class="text-lg font-extrabold tracking-tight mb-2">{{ r.title }}</h4>
    <p class="text-sm text-white/55 leading-relaxed">{{ r.body }}</p>
  </BentoTile>
</template>
