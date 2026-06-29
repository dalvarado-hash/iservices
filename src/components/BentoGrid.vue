<script setup>
import BentoTile from './BentoTile.vue'
import PricingBento from './PricingBento.vue'
import ReasonTiles from './ReasonTiles.vue'
</script>

<template>
  <section class="relative max-w-[1400px] mx-auto px-5 sm:px-8 pt-8 pb-16">
    <!-- the signature mosaic: a 12-col bento that reflows to 1 column on mobile -->
    <div
      class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-5 [grid-auto-flow:row_dense]"
    >
      <!-- pricing section heading tile -->
      <BentoTile id="pricing" variant="solid" class="md:col-span-6 lg:col-span-12 scroll-mt-28">
        <p class="mono-label text-brand-cyan mb-3">And it's cheaper too — published, no quote</p>
        <h2 class="display text-[clamp(26px,3.6vw,44px)] max-w-[24ch]">
          Drag it to your number.
          <span class="gradient-text">See your exact price, locked.</span>
        </h2>
      </BentoTile>

      <!-- pricing cluster: large chart tile + satellite stat / claim / competitor / footnote tiles -->
      <PricingBento />

      <!-- why-switch heading tile -->
      <BentoTile id="why" variant="gradient" class="md:col-span-6 lg:col-span-12 scroll-mt-28">
        <p class="mono-label text-brand-cyan mb-3">Why MSPs are switching</p>
        <h2 class="display text-[clamp(26px,3.6vw,44px)] max-w-[26ch]">
          One agent per site. Every client.
          <span class="gradient-text">No server to host.</span>
        </h2>
      </BentoTile>

      <!-- 3 "why switch" reason tiles -->
      <ReasonTiles />

      <!-- closing CTA tile -->
      <BentoTile variant="signature" class="md:col-span-6 lg:col-span-12 scroll-mt-28">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Leave PRTG without the rebuild.
            </h3>
            <p class="text-white/80 mt-2 max-w-[48ch]">
              Early MSP partners get migration help and locked launch pricing. No spam, no card.
            </p>
          </div>
          <a
            href="#waitlist"
            class="flex-none inline-flex items-center justify-center rounded-xl bg-white text-ink font-bold px-7 py-3.5 hover:bg-white/90 transition"
          >
            Get early access
          </a>
        </div>
      </BentoTile>
    </div>
  </section>
</template>
