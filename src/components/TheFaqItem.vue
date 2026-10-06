<script setup lang="ts">
defineProps<{
  question: string
  answer: string[]
  open?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div class="bg-zinc-700 p-2 rounded-lg">
    <h3>
      <button
        type="button"
        class="w-full flex items-center justify-between text-left"
        @click="emit('toggle')"
        :aria-expanded="!!open"
      >
        <span class="font-light text-xl">{{ question }}</span>
        <span class="material-symbols-outlined text-xl" aria-hidden="true">
          {{ open ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
    </h3>

    <div v-show="open" class="mt-2 text-sm text-gray-300 space-y-2">
      <p v-for="(line, i) in answer" :key="i">
        {{ line }}
      </p>
    </div>
  </div>
</template>
