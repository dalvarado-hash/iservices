<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-2 flex flex-col gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-[11.5px] text-slate-500 sm:flex-row sm:items-center sm:gap-4"
  >
    <span class="flex items-center gap-2">
      <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse-dot"></span>
      <span class="text-emerald-300">All systems operational</span>
    </span>
    <span class="hidden text-white/15 sm:inline">|</span>
    <span class="flex items-center gap-1.5 text-slate-400">
      <span aria-hidden="true">🔒</span> Published pricing, locked for 3 years
    </span>
    <span class="hidden text-white/15 sm:inline">|</span>
    <span class="text-slate-500">Per device, not per sensor.</span>
    <span class="text-slate-600 sm:ml-auto">
      Scout © {{ year }} Impulse · <a href="https://impulse.ky" class="text-slate-400 hover:text-signal-light">impulse.ky</a>
    </span>
  </footer>
</template>
