<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import {business} from "@/data/business";
</script>

<template>
  <div class="h-screen flex flex-col bg-zinc-900">
    <TheHeader />

    <main class="pt-[80px] bg-zinc-800 font-extralight text-white">
      <RouterView />

      <TheFooter
        :hours="business.hours"
        :phone="business.phone"
        :phoneHref="`tel:${business.phoneE164}`"
        :email="business.email"
        :emailHref="`mailto:${business.email}`"
        :serviceArea="business.serviceArea"
      />
    </main>
  </div>
</template>
