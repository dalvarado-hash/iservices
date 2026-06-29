<script setup>
// Decorative animated gradient-mesh backdrop. Purely presentational.
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- purple/blue blob -->
    <div
      class="mesh-blob absolute -top-1/4 -left-[10%] h-[55vw] w-[55vw] rounded-full opacity-50 blur-[90px]"
      style="background: radial-gradient(circle at 30% 30%, #7f39e9, transparent 60%)"
    ></div>
    <!-- cyan/blue blob -->
    <div
      class="mesh-blob-2 absolute top-[10%] right-[-15%] h-[50vw] w-[50vw] rounded-full opacity-40 blur-[100px]"
      style="background: radial-gradient(circle at 50% 50%, #00c3ff, #4138f3 45%, transparent 70%)"
    ></div>
    <!-- magenta blob -->
    <div
      class="mesh-blob absolute bottom-[-20%] left-[20%] h-[45vw] w-[45vw] rounded-full opacity-30 blur-[110px]"
      style="background: radial-gradient(circle at 50% 50%, #f1005b, transparent 60%)"
    ></div>
    <!-- subtle grid texture -->
    <div
      class="absolute inset-0 opacity-[0.04]"
      style="
        background-image: linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
        background-size: 56px 56px;
      "
    ></div>
  </div>
</template>
