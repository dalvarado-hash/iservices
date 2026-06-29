<script setup>
import BrandMark from './BrandMark.vue'
</script>

<template>
  <header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
    <nav
      class="flex items-center gap-3 sm:gap-5 rounded-xl border border-white/10 bg-panel/85 backdrop-blur-md pl-4 pr-2 py-2"
      aria-label="Primary"
    >
      <a href="#top" class="flex items-center gap-2 font-extrabold tracking-tight text-[16px]">
        <span class="text-brand-light"><BrandMark /></span>
        Impulse
        <span class="mono text-[10px] font-medium tracking-[0.16em] uppercase text-white/35 border border-white/12 rounded px-1.5 py-0.5 ml-0.5">
          Scout
        </span>
      </a>
      <span class="hidden sm:block h-4 w-px bg-white/12"></span>
      <a href="#pricing" class="hidden sm:inline text-sm text-white/60 hover:text-white transition">Pricing</a>
      <a href="#why" class="hidden sm:inline text-sm text-white/60 hover:text-white transition">Why switch</a>
      <a href="#waitlist" class="btn text-sm px-4 py-2">Get early access</a>
    </nav>
  </header>
</template>
