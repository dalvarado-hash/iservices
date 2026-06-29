<script setup>
import { ref } from 'vue'

// front-end only — wire to a real form/Tally/Formspark before launch
const email = ref('')
const joined = ref(false)
const emailInput = ref(null)

function join() {
  const em = email.value.trim()
  if (!em || !em.includes('@')) {
    if (emailInput.value) emailInput.value.focus()
    return
  }
  joined.value = true
}
</script>

<template>
  <div id="waitlist" class="w-full scroll-mt-28">
    <form v-if="!joined" class="flex flex-col sm:flex-row gap-2.5" @submit.prevent="join">
      <label for="hero-email" class="sr-only">Work email</label>
      <input
        id="hero-email"
        ref="emailInput"
        v-model="email"
        type="email"
        placeholder="you@youragency.com"
        class="flex-1 min-w-0 bg-white/[0.04] border border-white/12 rounded-lg px-4 py-3.5 text-[15px] text-white placeholder-white/35 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light transition"
      />
      <button type="submit" class="btn px-6 py-3.5 text-[15px]">Get early access</button>
    </form>

    <p
      v-else
      class="text-signal text-[15px] font-medium flex items-start gap-2.5"
      role="status"
    >
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" class="mt-0.5 flex-none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4" opacity="0.4" />
        <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>You're on the list. We'll reach out personally — reply to the email and tell us what you're running.</span>
    </p>

    <p v-if="!joined" class="text-[12.5px] text-white/40 mt-3">
      Early MSP partners get migration help and locked launch pricing. No spam, no card.
    </p>
  </div>
</template>
