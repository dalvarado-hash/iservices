<script setup>
// Bespoke "Scout" radar glyph — a swept arc + pinged node. Inherits color via currentColor.
</script>

<template>
  <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.3" stroke="currentColor" stroke-width="1.3" opacity="0.22" />
    <circle cx="10" cy="10" r="4.6" stroke="currentColor" stroke-width="1.3" opacity="0.4" />
    <path
      d="M10 10 L16.4 6.2"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M10 1.7 A8.3 8.3 0 0 1 16.4 6.2"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <circle cx="10" cy="10" r="1.7" fill="currentColor" />
  </svg>
</template>
