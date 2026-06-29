<script setup>
// Floating, centered, glassy pill navbar.
</script>

<template>
  <header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
    <nav
      class="glass rounded-full pl-5 pr-2 py-2 flex items-center gap-3 sm:gap-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
      aria-label="Primary"
    >
      <a href="#top" class="flex items-center gap-2 font-extrabold tracking-tight text-[17px]">
        <span
          class="h-2.5 w-2.5 rounded-full"
          style="background: linear-gradient(224.95deg, #a446f4, #4138f3); box-shadow: 0 0 12px #7f39e9"
        ></span>
        Impulse
      </a>
      <span class="hidden sm:block h-4 w-px bg-white/15"></span>
      <a
        href="#pricing"
        class="hidden sm:inline text-sm text-white/65 hover:text-white transition"
        >Pricing</a
      >
      <a
        href="#why"
        class="hidden sm:inline text-sm text-white/65 hover:text-white transition"
        >Why switch</a
      >
      <a href="#waitlist" class="btn-grad text-sm px-4 py-2">Get early access</a>
    </nav>
  </header>
</template>
