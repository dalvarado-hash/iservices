<script setup>
import { useReveal } from '../composables/useReveal'
const { setRoot } = useReveal()

const reasons = [
  {
    num: '01',
    tag: 'migrate',
    title: 'Switch without the rebuild',
    body: 'Drop in your PRTG export. Scout reads it, groups sensors into real devices, and hands you a plan to approve — not 2,000 settings to recreate by hand.',
  },
  {
    num: '02',
    tag: 'deploy',
    title: 'Outbound agent, nothing inbound',
    body: 'One lightweight agent per client site phones home to your cloud. No VPN into their network, no firewall tickets, no server for you or them to maintain.',
  },
  {
    num: '03',
    tag: 'report',
    title: 'Reports your clients actually read',
    body: 'White-label network health reports per client, on a schedule. The deliverable that proves your value every month — built in, not bolted on.',
  },
]
</script>

<template>
  <section :ref="setRoot" class="py-20 sm:py-28">
    <div class="reading-column">
      <p class="reveal font-mono text-[12px] uppercase tracking-[0.2em] text-brand">Why MSPs are switching</p>
      <h2 class="reveal mt-4 text-[clamp(28px,4.5vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink text-balance" style="transition-delay: 60ms">
        One agent per site. Every client. No server to host.
      </h2>
    </div>

    <ol class="reading-wide mt-14 list-none space-y-16 sm:space-y-20">
      <li
        v-for="(r, i) in reasons"
        :key="r.num"
        class="reveal flex flex-col gap-6 sm:items-center"
        :class="i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : 'sm:flex-row'"
      >
        <!-- oversized mono numeral -->
        <div class="flex-none">
          <div class="font-mono text-[clamp(64px,12vw,128px)] font-medium leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_#7F39E9]">
            {{ r.num }}
          </div>
        </div>

        <!-- the reason text -->
        <div
          class="sm:max-w-[44ch]"
          :class="i % 2 === 1 ? 'sm:ml-auto' : ''"
        >
          <p class="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-deep">/ {{ r.tag }}</p>
          <h3 class="mt-3 text-[clamp(22px,3vw,30px)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            {{ r.title }}
          </h3>
          <p class="mt-4 text-[16px] leading-relaxed text-muted text-pretty">
            {{ r.body }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>
