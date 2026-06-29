<script setup>
import { ref } from 'vue'

// Front-end only — wire to a real form/Tally/Formspark before launch.
const email = ref('')
const joined = ref(false)
const inputEl = ref(null)

function join() {
  const em = email.value.trim()
  if (!em || !em.includes('@')) {
    if (inputEl.value) inputEl.value.focus()
    return
  }
  joined.value = true
}
</script>

<template>
  <!-- FULL-BLEED closing CTA band -->
  <section id="waitlist" class="border-y border-brand/20 bg-gradient-to-br from-brand to-brand-deep py-20 text-white sm:py-28">
    <div class="reading-column text-center">
      <p class="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70">Get early access</p>
      <h2 class="mt-5 text-[clamp(28px,5vw,48px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
        Bring your PRTG export. Leave the rebuild behind.
      </h2>
      <p class="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/85 text-pretty">
        Early MSP partners get migration help and locked launch pricing. No spam, no card.
      </p>

      <form v-if="!joined" class="mx-auto mt-9 flex max-w-[520px] flex-col gap-3 sm:flex-row" @submit.prevent="join">
        <input
          ref="inputEl"
          v-model="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="you@youragency.com"
          aria-label="Work email"
          class="flex-1 rounded-xl border border-white/25 bg-white/10 px-4 py-3.5 text-[15px] text-white placeholder:text-white/55 focus:border-transparent focus:outline focus:outline-2 focus:outline-white"
        />
        <button
          type="submit"
          class="whitespace-nowrap rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-brand-deep transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get early access
        </button>
      </form>

      <p v-else class="mx-auto mt-9 max-w-[52ch] rounded-xl border border-white/25 bg-white/10 px-5 py-4 text-[15px] text-white" role="status">
        &#10003; You're on the list. We'll reach out personally &mdash; reply to the email and tell us
        what you're running.
      </p>

      <p v-if="!joined" class="mx-auto mt-4 max-w-[52ch] text-[12.5px] text-white/65">
        Migration help and locked launch pricing for early partners.
      </p>
    </div>
  </section>
</template>
