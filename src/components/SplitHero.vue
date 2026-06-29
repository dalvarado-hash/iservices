<script setup>
import GradientMesh from './GradientMesh.vue'
import MigrationDemo from './MigrationDemo.vue'
import Waitlist from './Waitlist.vue'
</script>

<template>
  <section id="top" class="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-0">
    <GradientMesh />

    <!-- SPLIT SCREEN: left copy / right live demo -->
    <div class="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        <!-- LEFT half -->
        <div class="reveal" style="animation-delay: 0.05s">
          <span
            class="inline-flex items-center gap-2 mono-label text-amber border border-white/12 rounded-full px-4 py-1.5 mb-7"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-amber"></span>
            For MSPs leaving PRTG &amp; SolarWinds
          </span>

          <h1 class="display text-[clamp(34px,5.2vw,62px)] max-w-[15ch]">
            Leaving PRTG used to mean rebuilding everything.
            <span class="gradient-text">Now it takes an afternoon.</span>
          </h1>

          <p class="mt-6 text-[clamp(16px,2vw,19px)] text-white/60 max-w-[52ch]">
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
        <div class="reveal lg:pl-2" style="animation-delay: 0.2s">
          <MigrationDemo />
        </div>
      </div>
    </div>
  </section>
</template>
