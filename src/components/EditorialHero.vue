<script setup>
import { useReveal } from '../composables/useReveal'
const { setRoot } = useReveal()
</script>

<template>
  <section id="top" :ref="setRoot" class="pt-20 pb-16 sm:pt-28 sm:pb-20">
    <div class="reading-column">
      <p class="reveal font-mono text-[12px] uppercase tracking-[0.2em] text-brand">
        For MSPs leaving PRTG &amp; SolarWinds
      </p>

      <h1
        class="reveal mt-7 text-[clamp(38px,7vw,64px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink text-balance"
        style="transition-delay: 60ms"
      >
        Leaving PRTG used to mean rebuilding everything. Now it takes an afternoon.
      </h1>

      <p
        class="reveal mt-8 text-[19px] leading-relaxed text-muted text-pretty"
        style="transition-delay: 120ms"
      >
        Scout reads your PRTG export and rebuilds your whole network for you &mdash; devices, groups,
        thresholds, all of it. Monitor every client from one cloud. Priced
        <strong class="font-semibold text-ink">per device, not per sensor.</strong> Published, locked
        for 3 years.
      </p>

      <div class="reveal mt-10 hairline" style="transition-delay: 180ms"></div>

      <p
        class="reveal mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12.5px] uppercase tracking-[0.12em] text-muted-soft"
        style="transition-delay: 220ms"
      >
        <span>One cloud</span>
        <span aria-hidden="true" class="text-slate-300">&middot;</span>
        <span>One agent per site</span>
        <span aria-hidden="true" class="text-slate-300">&middot;</span>
        <span>No server to host</span>
      </p>
    </div>
  </section>
</template>
