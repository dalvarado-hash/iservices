<script setup>
import { ref } from 'vue'

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
  <div id="waitlist" class="scroll-mt-6">
    <form
      v-if="!joined"
      class="flex flex-col gap-2.5 sm:flex-row"
      @submit.prevent="join"
    >
      <div
        class="flex flex-1 items-center gap-2 rounded-lg border border-white/12 bg-black/30 px-3 focus-within:border-signal-light/60"
      >
        <span class="font-mono text-[13px] text-signal-light/80" aria-hidden="true">&gt;</span>
        <input
          ref="emailInput"
          v-model="email"
          type="email"
          placeholder="you@youragency.com"
          aria-label="Work email"
          class="w-full bg-transparent py-3 font-mono text-[14px] text-white placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="grad-brand whitespace-nowrap rounded-lg px-5 py-3 text-[14px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(127,57,233,0.9)] transition-transform hover:-translate-y-px"
      >
        Get early access
      </button>
    </form>

    <p v-if="!joined" class="mt-2.5 text-[12.5px] text-slate-500">
      Early MSP partners get migration help and locked launch pricing. No spam, no card.
    </p>

    <p
      v-else
      role="status"
      class="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-[14px] text-emerald-200"
    >
      <span aria-hidden="true">✓</span>
      <span
        >You're on the list. We'll reach out personally — reply to the email and tell us what
        you're running.</span
      >
    </p>
  </div>
</template>
