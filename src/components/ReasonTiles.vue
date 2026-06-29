<script setup>
import BentoTile from './BentoTile.vue'

const reasons = [
  {
    n: '01 / migrate',
    title: 'Switch without the rebuild',
    body: 'Drop in your PRTG export. Scout reads it, groups sensors into real devices, and hands you a plan to approve — not 2,000 settings to recreate by hand.'
  },
  {
    n: '02 / deploy',
    title: 'Outbound agent, nothing inbound',
    body: 'One lightweight agent per client site phones home to your cloud. No VPN into their network, no firewall tickets, no server for you or them to maintain.'
  },
  {
    n: '03 / report',
    title: 'Reports your clients actually read',
    body: 'White-label network health reports per client, on a schedule. The deliverable that proves your value every month — built in, not bolted on.'
  }
]
</script>

<template>
  <BentoTile
    v-for="(r, i) in reasons"
    :key="r.n"
    variant="glass"
    class="md:col-span-2 lg:col-span-4"
    :delay="0.05 + i * 0.07"
  >
    <div class="font-mono text-xs gradient-text-signature mb-3">{{ r.n }}</div>
    <h4 class="text-lg font-extrabold tracking-tight mb-2">{{ r.title }}</h4>
    <p class="text-sm text-white/55 leading-relaxed">{{ r.body }}</p>
  </BentoTile>
</template>
