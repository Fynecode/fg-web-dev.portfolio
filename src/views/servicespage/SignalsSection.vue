<script setup>
import { Check } from 'lucide-vue-next'

const signals = [
  "It's slow to load, especially on mobile",
  "You're afraid to change anything yourself",
  "It doesn't reflect the business you run today",
  "It doesn't rank or show up in search",
  'It looks broken on phones',
  "You don't have one at all yet",
]
</script>

<template>
  <section class="w-full bg-[#fafafc] px-5 py-12 sm:px-8 md:px-12 lg:px-20">
    <div class="mx-auto w-full max-w-[1160px]">
      <div class="relative overflow-hidden rounded-3xl bg-[#f2f3f9] px-7 py-9 sm:px-12 sm:py-12">
        <div class="relative z-10">
          <h2 class="max-w-xl text-2xl font-bold text-[#101f3d]">Signs your website needs work</h2>
          <ul class="mb-8 mt-7 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-x-12">
            <li v-for="signal in signals" :key="signal" class="flex items-start gap-3 text-sm font-medium text-[#101f3d]">
              <span class="contact-btn grid size-5 shrink-0 place-items-center rounded-full text-white">
                <Check :size="12" stroke-width="3" />
              </span>
              {{ signal }}
            </li>
          </ul>
          <router-link
            to="/contact"
            class="contact-btn inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(138,63,224,0.55)] transition-transform hover:-translate-y-0.5"
          >
            Let's discuss your challenges
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
