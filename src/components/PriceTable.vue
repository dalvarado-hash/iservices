<script setup>
import { useReveal } from '../composables/useReveal'
const { setRoot } = useReveal()

const cols = ['Scout', 'PRTG', 'SolarWinds', 'Auvik']

// Static, prose-style comparison. Numbers preserved from source pricing.
const rows = [
  {
    label: 'Billed by',
    cells: ['Device', 'Sensor (tiered)', 'Node', 'Device'],
  },
  {
    label: 'Rate',
    cells: [
      '$2.50 / device',
      '$200–$1,642 / mo',
      '~$7 / node / mo',
      '~$3 / device / mo',
    ],
  },
  {
    label: 'Volume',
    cells: [
      '$2.00 over 100, $1.50 over 500',
      'Fixed tiers, 50 → 1,000+',
      'Per node, flat',
      'Per device, flat',
    ],
  },
  {
    label: 'Pricing',
    cells: [
      'Published, locked 3 yrs',
      'Top two tiers: quote',
      'Quote',
      'Quote',
    ],
  },
  {
    label: 'Minimum',
    cells: ['$29 / mo', 'PRTG 500 tier', '—', '—'],
  },
]
</script>

<template>
  <section id="pricing" :ref="setRoot" class="py-20 sm:py-24">
    <div class="reading-column">
      <p class="reveal font-mono text-[12px] uppercase tracking-[0.2em] text-brand">
        And it's cheaper too &mdash; published, no quote
      </p>
      <h2 class="reveal mt-4 text-[clamp(28px,4.5vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink text-balance" style="transition-delay: 60ms">
        Four tools, one honest column.
      </h2>
      <p class="reveal mt-5 text-[17px] leading-relaxed text-muted text-pretty" style="transition-delay: 100ms">
        Everyone else prices on a unit you can't predict &mdash; sensors, nodes, the line item that
        balloons at renewal. Scout prices on the thing you actually count: the device.
      </p>
    </div>

    <!-- the comparison table gets a touch more width than the prose spine -->
    <div class="reveal reading-wide mt-12" style="transition-delay: 140ms">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left align-top">
          <caption class="sr-only">
            Pricing comparison of Scout, PRTG, SolarWinds and Auvik
          </caption>
          <thead>
            <tr class="border-b-2 border-ink">
              <th scope="col" class="py-4 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-soft"></th>
              <th
                v-for="(c, i) in cols"
                :key="c"
                scope="col"
                class="py-4 px-4 text-[15px] font-extrabold tracking-[-0.02em]"
                :class="i === 0 ? 'text-brand' : 'text-ink'"
              >
                {{ c }}
                <span v-if="i === 0" class="ml-1 align-middle font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-brand/70">us</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(r, ri) in rows"
              :key="r.label"
              class="border-b border-slate-200"
            >
              <th
                scope="row"
                class="whitespace-nowrap py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-soft"
              >
                {{ r.label }}
              </th>
              <td
                v-for="(cell, ci) in r.cells"
                :key="ci"
                class="py-4 px-4 text-[14px] leading-snug"
                :class="ci === 0 ? 'font-semibold text-brand-deep' : 'text-muted'"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-6 max-w-[70ch] text-[11.5px] leading-relaxed text-muted-soft">
        Competitor figures from published pricing; estimates for comparison, not quotes. PRTG tiers run
        from PRTG 500 ($200/mo for 50 devices) through PRTG 10000 ($1,642/mo for 1,000) &mdash; the two
        largest tiers require "talk to sales." SolarWinds ~$7/node/mo. Auvik ~$3/device/mo.
      </p>
    </div>
  </section>
</template>
