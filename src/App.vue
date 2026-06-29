<script setup>
import PillNav from './components/PillNav.vue'
import SplitHero from './components/SplitHero.vue'
import BentoGrid from './components/BentoGrid.vue'
import FooterTile from './components/FooterTile.vue'
</script>

<template>
  <!-- fixed engineered backdrop: blueprint grid + single restrained wash -->
  <div class="backdrop" aria-hidden="true">
    <div class="backdrop-wash"></div>
    <div class="backdrop-grid"></div>
  </div>

  <PillNav />
  <main>
    <SplitHero />
    <BentoGrid />
  </main>
  <FooterTile />

  <!-- film grain overlay, sits above content but below the nav -->
  <div class="grain" aria-hidden="true"></div>
</template>
