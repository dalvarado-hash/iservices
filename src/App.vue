<script setup>
import AppSidebar from './components/AppSidebar.vue'
import HeroPanel from './components/HeroPanel.vue'
import MigrationDemo from './components/MigrationDemo.vue'
import PricingWidget from './components/PricingWidget.vue'
import SwitchLog from './components/SwitchLog.vue'
import StatusFooter from './components/StatusFooter.vue'
</script>

<template>
  <a
    href="#migrate"
    class="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
    >Skip to content</a
  >

  <div class="min-h-screen lg:flex">
    <!-- fixed left sidebar / mobile top bar -->
    <AppSidebar />

    <!-- main scrollable dashboard area -->
    <main class="min-w-0 flex-1">
      <div class="mx-auto flex max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8">
        <!-- main header strip -->
        <div class="flex items-center justify-between gap-3">
          <div>
            <h2 class="text-[13px] font-semibold tracking-tight text-slate-200">
              Network monitoring for MSPs
            </h2>
            <p class="font-mono text-[11px] text-slate-500">Devices, not sensors.</p>
          </div>
          <div
            class="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-slate-400 sm:flex"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
            v0.1 · early access
          </div>
        </div>

        <HeroPanel />
        <MigrationDemo />
        <PricingWidget />
        <SwitchLog />
        <StatusFooter />
      </div>
    </main>
  </div>
</template>
