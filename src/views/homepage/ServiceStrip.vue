<script setup>
import { Database, Code2, Boxes, MonitorCog } from 'lucide-vue-next'

const services = [
  { title: 'Backend Development', icon: Database },
  { title: 'Web Development', icon: Code2 },
  { title: 'UI/UX Design', icon: Boxes },
  { title: 'Internal Systems', icon: MonitorCog },
]
</script>

<template>
  <div class="mx-auto w-full max-w-[1160px] px-5 sm:px-8 md:px-12 lg:px-20">
    <div class="grid grid-cols-2 rounded-2xl border border-[#e6e8f2] bg-white shadow-[0_20px_50px_-30px_rgba(16,31,61,0.18)] lg:grid-cols-4">
      <div v-for="(service, index) in services" :key="service.title" class="relative p-6 text-center sm:p-8" :class="index % 2 !== 0 ? 'before:absolute before:left-0 before:top-1/4 before:h-1/2 before:border-l before:border-[#e6e8f2]' : 'lg:before:absolute lg:before:left-0 lg:before:top-1/4 lg:before:h-1/2 lg:before:border-l lg:before:border-[#e6e8f2]'">
        <component :is="service.icon" class="mx-auto text-[#8a3fe0]" :size="48" stroke-width="1.5" />
        <h3 class="mt-3 text-sm font-bold">{{ service.title }}</h3>
      </div>
    </div>
  </div>
</template>