<script setup>
// Final wide footer strip styled as a bento tile.
</script>

<template>
  <footer class="max-w-[1400px] mx-auto px-5 sm:px-8 pb-10">
    <div
      class="reveal rounded-3xl glass px-6 sm:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div>
        <div class="flex items-center gap-2 font-extrabold tracking-tight text-lg mb-3">
          <span
            class="h-2.5 w-2.5 rounded-full"
            style="background: linear-gradient(224.95deg, #a446f4, #4138f3); box-shadow: 0 0 12px #7f39e9"
          ></span>
          Impulse
          <span class="text-white/40 font-medium">·</span>
          <span class="text-white/60 font-semibold">Scout</span>
        </div>
        <p class="text-sm text-white/50 max-w-[52ch]">
          Per device, not per sensor. Built by network people, for the ones leaving Turn/River
          pricing behind.
        </p>
      </div>

      <div class="flex flex-col items-start md:items-end gap-3">
        <span
          class="inline-flex items-center gap-2 text-sm text-signal border border-signal/40 rounded-full px-4 py-2"
        >
          <span aria-hidden="true">🔒</span> Published pricing, locked for 3 years
        </span>
        <a href="#waitlist" class="btn-grad px-5 py-2.5 text-sm">Get early access</a>
      </div>
    </div>
    <p class="text-center text-xs text-white/30 mt-6">
      © 2026 Impulse · impulse.ky — Scout is a product of Impulse.
    </p>
  </footer>
</template>
