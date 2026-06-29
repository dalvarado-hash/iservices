<script setup>
import MigrationDemo from './MigrationDemo.vue'
import Waitlist from './Waitlist.vue'
</script>

<template>
  <section id="top" class="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16 lg:pt-28 lg:pb-0">
    <div class="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8">
      <div class="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <!-- LEFT half -->
        <div class="reveal" style="animation-delay: 0.05s">
          <span class="eyebrow mb-7">
            <span class="rule"></span>
            For MSPs leaving PRTG &amp; SolarWinds
          </span>

          <h1 class="display text-[clamp(34px,5.2vw,60px)] max-w-[15ch] mt-1">
            Leaving PRTG used to mean rebuilding everything.
            <span class="text-white">Now it takes <span class="ink-underline">an afternoon.</span></span>
          </h1>

          <p class="mt-7 text-[clamp(16px,2vw,18px)] text-white/60 max-w-[52ch]">
            Scout reads your PRTG export and rebuilds your whole network for you — devices, groups,
            thresholds, all of it. Monitor every client from one cloud. Priced
            <b class="text-white font-semibold">per device, not per sensor.</b>
            Published, locked for 3 years.
          </p>

          <div class="mt-9 max-w-[520px]">
            <Waitlist />
          </div>
        </div>

        <!-- RIGHT half = live migration demo -->
        <div class="reveal" style="animation-delay: 0.18s">
          <MigrationDemo />
        </div>
      </div>
    </div>
  </section>
</template>
