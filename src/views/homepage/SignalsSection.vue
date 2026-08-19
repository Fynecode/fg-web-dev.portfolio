<script setup>
import { Check } from 'lucide-vue-next'

const signals = [
  'You rely on too much manual work',
  'Reports take too long',
  'Information is hard to find',
  "You can't scale with current tools",
  "Systems don't work together",
  "You're ready for something better",
]
</script>

<template>
  <div class="mx-auto w-full max-w-[1160px] px-5 sm:px-8 md:px-12 lg:px-20">
    <div class="rounded-3xl bg-[#f2f3f9] p-8 text-center sm:p-12">
      <h2 class="text-2xl font-bold">Signs you need a better solution</h2>
      <ul class="mx-auto mb-8 mt-7 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2 sm:gap-x-10">
        <li v-for="signal in signals" :key="signal" class="flex items-start gap-2.5 text-sm font-medium">
          <span class="grid size-5 shrink-0 place-items-center rounded-full contact-btn text-white"><Check :size="13" stroke-width="3" /></span>
          {{ signal }}
        </li>
      </ul>
      <router-link to="/contact" class="inline-flex items-center justify-center gap-2 rounded-full contact-btn px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(138,63,224,0.55)] transition-transform hover:-translate-y-0.5">Let's discuss your challenges</router-link>
    </div>
  </div>
</template>