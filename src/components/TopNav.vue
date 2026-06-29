<script setup>
// Minimal editorial top bar: wordmark left, single early-access link right.
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
    <nav class="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
      <a href="#top" class="group flex items-baseline gap-2" aria-label="Impulse home">
        <span class="text-[19px] font-extrabold tracking-[-0.04em] text-ink">Impulse</span>
        <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-soft">/ Scout</span>
      </a>
      <a
        href="#waitlist"
        class="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink underline decoration-brand/40 decoration-2 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand"
      >
        Get early access
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
      </a>
    </nav>
  </header>
</template>
