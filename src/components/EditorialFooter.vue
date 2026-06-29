<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-white py-16">
    <div class="reading-wide">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="flex items-baseline gap-2">
            <span class="text-[18px] font-extrabold tracking-[-0.04em] text-ink">Impulse</span>
            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-soft">/ Scout</span>
          </div>
          <p class="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-muted">
            Per device, not per sensor. Built by network people, for the ones leaving Turn/River
            pricing behind.
          </p>
        </div>
        <div
          class="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/[0.05] px-4 py-2 font-mono text-[12px] text-brand-deep"
        >
          <span aria-hidden="true">&#128274;</span>
          Published pricing, locked for 3 years
        </div>
      </div>

      <div class="mt-12 hairline"></div>

      <div
        class="mt-6 flex flex-col gap-2 text-[12.5px] text-muted-soft sm:flex-row sm:items-center sm:justify-between"
      >
        <span>&copy; {{ year }} Impulse &middot; impulse.ky</span>
        <span class="font-mono uppercase tracking-[0.12em]">Scout &mdash; network monitoring for MSPs</span>
      </div>
    </div>
  </footer>
</template>
