<script setup>
import BrandMark from './BrandMark.vue'
</script>

<template>
  <footer class="max-w-[1380px] mx-auto px-5 sm:px-8 pb-10">
    <div
      class="reveal rounded-2xl panel px-6 sm:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div>
        <div class="flex items-center gap-2 font-extrabold tracking-tight text-lg mb-3">
          <span class="text-brand-light"><BrandMark /></span>
          Impulse
          <span class="text-white/30 font-medium">/</span>
          <span class="text-white/60 font-semibold">Scout</span>
        </div>
        <p class="text-sm text-white/50 max-w-[52ch]">
          Per device, not per sensor. Built by network people, for the ones leaving Turn/River
          pricing behind.
        </p>
      </div>

      <div class="flex flex-col items-start md:items-end gap-3">
        <span class="inline-flex items-center gap-2 text-sm text-white/70 border border-white/12 rounded-md px-3.5 py-2">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" class="text-brand-light" aria-hidden="true">
            <rect x="4" y="8.5" width="12" height="8" rx="1.6" stroke="currentColor" stroke-width="1.5" />
            <path d="M6.5 8.5V6.5a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Published pricing, locked for 3 years
        </span>
        <a href="#waitlist" class="btn px-5 py-2.5 text-sm">Get early access</a>
      </div>
    </div>
    <p class="text-center text-xs text-white/30 mt-6">
      © 2026 Impulse · impulse.ky — Scout is a product of Impulse.
    </p>
  </footer>
</template>
