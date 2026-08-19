<script setup>
import { computed } from 'vue'

const props = defineProps({
  serviceType: {
    type: String,
    required: true,
  },
})

const stats = computed(() => {
  if (props.serviceType === 'websites') {
    return [
      ['2+', 'Years of web development'],
      ['98%', 'Client satisfaction'],
      ['<2s', 'Average load time'],
      ['4-8wk', 'Typical turnaround'],
    ]
  }

  if (props.serviceType === 'workflow') {
    return [
      ['40%', 'Less manual admin'],
      ['24/7', 'Background automation'],
      ['3+', 'Tools connected'],
      ['2-6wk', 'Typical turnaround'],
    ]
  }

  return [
    ['1', 'Central workspace'],
    ['100%', 'Tailored workflows'],
    ['Live', 'Operational visibility'],
    ['4-10wk', 'Typical turnaround'],
  ]
})
</script>

<template>
  <section class="w-full bg-[#fafafc] px-5 pb-16 sm:px-8 md:px-12 lg:px-20">
    <div class="mx-auto w-full max-w-[1160px]">
      <div class="grid overflow-hidden rounded-2xl border border-[#e6e8f2] bg-white shadow-[0_20px_50px_-30px_rgba(16,31,61,0.18)] sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat[1]"
          class="relative px-4 py-7 text-center after:absolute after:bottom-0 after:left-8 after:right-8 after:h-px after:bg-[#e6e8f2] sm:after:hidden lg:[&:not(:first-child)]:before:absolute lg:[&:not(:first-child)]:before:bottom-6 lg:[&:not(:first-child)]:before:left-0 lg:[&:not(:first-child)]:before:top-6 lg:[&:not(:first-child)]:before:w-px lg:[&:not(:first-child)]:before:bg-[#e6e8f2]"
        >
          <div class="gradient1 text-3xl font-extrabold">{{ stat[0] }}</div>
          <p class="mt-1 text-xs text-[#4a5573]">{{ stat[1] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
