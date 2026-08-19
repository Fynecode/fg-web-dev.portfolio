<script setup>
import { ArrowRight, Phone } from 'lucide-vue-next'
import HeroCubeArt from './HeroCubeArt.vue'
</script>

<template>
  <section
    class="flex w-full flex-col overflow-hidden bg-[#fafafc] px-5 py-24 sm:px-8 md:px-12 lg:px-20"
    aria-labelledby="hero-heading"
  >

    <div class="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-10 text-center lg:gap-12">
      <div class="flex w-full max-w-4xl flex-col items-center">
      <p class="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4a5573]">Consult <span class="text-[#e31c79]">&bull;</span> Plan <span class="text-[#e31c79]">&bull;</span> Build <span class="text-[#e31c79]">&bull;</span> Support</p>
      <h1
        id="hero-heading"
        class="max-w-4xl text-[clamp(2.1rem,4vw,3.3rem)] font-bold leading-[1.22] tracking-[-0.04em]"
      >
        We start by understanding your business, then building the <span class="gradient1">right software</span> around it.
        <span class="sr-only">by Fynecode Development</span>
      </h1>

      <p class="mt-6 max-w-xl text-base leading-7 text-[#4a5573] sm:text-lg">We understand your business, then build the right digital solutions to help you grow.</p>

      <div class="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
        <router-link to="/contact" class="inline-flex items-center justify-center gap-2 rounded-full contact-btn px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(138,63,224,0.55)] transition-transform hover:-translate-y-0.5"><Phone :size="16" />Book a discovery call</router-link>
        <router-link to="/projects" class="inline-flex items-center justify-center gap-2 rounded-full border border-[#e6e8f2] bg-white px-5 py-3 text-sm font-semibold text-[#101f3d] transition-transform hover:-translate-y-0.5">See our work <ArrowRight :size="17" /></router-link>
      </div>
      </div>
      <HeroCubeArt />
    </div>
  </section>
</template>
