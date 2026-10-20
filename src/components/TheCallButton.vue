<script setup lang="ts">
defineProps<{
  phone: string       // e.g. "(330) 555-1234"
  phoneHref: string   // e.g. "tel:+13305551234"
}>()
</script>

<template>
  <!-- Floating tap-to-call button, shown on mobile only -->
  <a
    class="md:hidden fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-zinc-900 shadow-lg shadow-black/40 ring-2 ring-zinc-900 active:scale-95 transition"
    :href="phoneHref"
    :aria-label="`Call Hartville Electronics Repair at ${phone}`"
  >
    <span class="material-symbols-outlined text-[28px]" aria-hidden="true">call</span>
  </a>
</template>
