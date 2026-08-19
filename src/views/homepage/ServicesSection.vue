<script setup>
import { Code2, Settings2, Wrench } from 'lucide-vue-next'

const services = [
  { title: 'Custom Solutions', description: 'Scalable software solutions designed for your business.', icon: Code2 },
  { title: 'Process Automation', description: 'Automate workflows and eliminate manual work for better results.', icon: Settings2 },
  { title: 'Ongoing Support', description: 'We stay with you after launch and keep improving.', icon: Wrench },
]
</script>

<template>
  <div class="mx-auto w-full max-w-[1160px] px-5 sm:px-8 md:px-12 lg:px-20">
    <header class="mb-10 flex flex-col items-center text-center">
      <p class="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#e31c79]">How we help</p>
      <h2 class="text-[clamp(1.7rem,3vw,2.1rem)] font-bold">Ways we move your business forward</h2>
    </header>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="service in services" :key="service.title" class="rounded-2xl border border-[#e6e8f2] bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,31,61,0.25)]">
        <div class="mb-4 grid size-12 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(60,100,244,0.1),rgba(227,28,121,0.1))] text-[#8a3fe0]"><component :is="service.icon" :size="24" /></div>
        <h3 class="mb-2 text-base font-bold">{{ service.title }}</h3>
        <p class="text-sm text-[#4a5573]">{{ service.description }}</p>
      </article>
    </div>
  </div>
</template>
