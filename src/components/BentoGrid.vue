<script setup>
import BentoTile from './BentoTile.vue'
import PricingBento from './PricingBento.vue'
import ReasonTiles from './ReasonTiles.vue'
</script>

<template>
  <section class="relative max-w-[1380px] mx-auto px-5 sm:px-8 pt-6 pb-16">
    <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-5 [grid-auto-flow:row_dense]">
      <!-- pricing section heading -->
      <BentoTile id="pricing" variant="bare" class="md:col-span-6 lg:col-span-12 scroll-mt-28 !p-0 pt-6 pb-1">
        <div class="eyebrow mb-4"><span class="rule"></span>02 — Pricing · published, no quote</div>
        <h2 class="display text-[clamp(26px,3.6vw,42px)] max-w-[24ch]">
          Drag it to your number.
          <span class="text-white">See your <span class="ink-underline">exact price</span>, locked.</span>
        </h2>
      </BentoTile>

      <!-- pricing cluster: large chart tile + satellite tiles -->
      <PricingBento />

      <!-- why-switch section heading -->
      <BentoTile id="why" variant="bare" class="md:col-span-6 lg:col-span-12 scroll-mt-28 !p-0 pt-8 pb-1">
        <div class="eyebrow mb-4"><span class="rule"></span>03 — Why MSPs are switching</div>
        <h2 class="display text-[clamp(26px,3.6vw,42px)] max-w-[26ch]">
          One agent per site. Every client.
          <span class="text-white">No server to host.</span>
        </h2>
      </BentoTile>

      <!-- 3 reason tiles -->
      <ReasonTiles />

      <!-- closing CTA -->
      <BentoTile variant="accent" class="md:col-span-6 lg:col-span-12 scroll-mt-28">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Leave PRTG without the rebuild.
            </h3>
            <p class="text-white/85 mt-2 max-w-[48ch]">
              Early MSP partners get migration help and locked launch pricing. No spam, no card.
            </p>
          </div>
          <a
            href="#waitlist"
            class="flex-none inline-flex items-center justify-center rounded-lg bg-white text-ink font-bold px-7 py-3.5 hover:bg-white/90 transition"
          >
            Get early access
          </a>
        </div>
      </BentoTile>
    </div>
  </section>
</template>
