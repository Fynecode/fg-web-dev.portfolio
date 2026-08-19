<script setup>
import { Phone } from 'lucide-vue-next'
</script>

<template>
  <section class="w-full bg-[#fafafc] px-5 py-12 sm:px-8 md:px-12 lg:px-20">
    <div class="mx-auto w-full max-w-[1160px]">
      <div class="contact-btn flex flex-col items-start justify-between gap-7 overflow-hidden rounded-3xl px-7 py-9 text-white sm:px-12 sm:py-12 lg:flex-row lg:items-center">
        <div>
          <h2 class="max-w-lg text-2xl font-bold">Ready for a website that actually works for you?</h2>
          <p class="mt-2 text-sm text-white/85">Book a discovery call and let's talk about what you need.</p>
        </div>
        <router-link
          to="/contact"
          class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#101f3d] transition-colors hover:text-[#8a3fe0] sm:w-fit"
        >
          <Phone size="17" />
          Book a discovery call
        </router-link>
      </div>
    </div>
  </section>
</template>
