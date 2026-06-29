<script setup>
import TopNav from './components/TopNav.vue'
import EditorialHero from './components/EditorialHero.vue'
import BeforeAfterDemo from './components/BeforeAfterDemo.vue'
import PriceTable from './components/PriceTable.vue'
import Calculator from './components/Calculator.vue'
import NumberedReasons from './components/NumberedReasons.vue'
import Waitlist from './components/Waitlist.vue'
import EditorialFooter from './components/EditorialFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-white text-ink antialiased">
    <TopNav />
    <main>
      <!-- narrow reading column -->
      <EditorialHero />
      <!-- full-bleed band: vertical before -> after figure -->
      <BeforeAfterDemo />
      <!-- narrow reading column: static comparison table -->
      <PriceTable />
      <!-- full-bleed band: interactive calculator -->
      <Calculator />
      <!-- narrow reading column: numbered reasons -->
      <NumberedReasons />
      <!-- full-bleed closing CTA band -->
      <Waitlist />
    </main>
    <EditorialFooter />
  </div>
</template>
