<script setup>
import contactForm from '@/components/contact.form.vue';
import { ArrowRight, Telescope, Cpu, LifeBuoy } from 'lucide-vue-next'
</script>

<template>
  <section
    class="w-full min-h-screen px-5 py-24 sm:px-8 md:px-12 lg:px-20 lg:py-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-10 relative overflow-hidden bg-white"
    aria-labelledby="hero-heading"
  >

  <div
  class="absolute
    -right-32
    top-1/2
    h-[320px]
    w-[420px]
    sm:h-[420px]
    sm:w-[560px]
    lg:right-0
    lg:top-[20%]
    lg:h-[400px]
    lg:w-[600px]
    -translate-x-1/5
    -translate-y-1/5
    rounded-full
    bg-primary/40
    blur-[120px]
    lg:blur-[180px]">
  </div>

  <div
  class="absolute
    -right-24
    lg:top-1/4
    top-1/3
    h-[280px]
    w-[320px]
    sm:h-[340px]
    sm:w-[420px]
    lg:right-0
    lg:h-[420px]
    lg:w-[520px]
    rounded-full
    bg-secondary/40
    blur-[120px]
    lg:blur-[180px]">
  </div>

  <div
  class="absolute
    -right-40
    top-3/4
    h-[340px]
    w-[340px]
    sm:h-[440px]
    sm:w-[440px]
    lg:right-0
    lg:top-0
    lg:h-[650px]
    lg:w-[650px]
    rounded-full
    bg-gradient-to-br
    from-primary/20
    to-secondary/25
    blur-[140px]
    lg:blur-[220px]">
  </div>

    <!-- Hero Content -->
    <div class="relative z-10 flex w-full max-w-2xl flex-col items-center gap-7 text-center lg:items-start lg:text-left lg:gap-10 lg:flex-1">
      <h1
        id="hero-heading"
        class="flex w-full flex-col gap-2 text-3xl font-bold leading-tight sm:text-4xl md:text-4xl lg:text-5xl"
      >
        <span>Reduce manual work.</span>
        <span class="text-primary">Improve visibility.</span>
        <span class="gradient1">Create room to grow.</span>
        <span class="sr-only">by Fynecode Development</span>
      </h1>

      <p
        class="max-w-xl text-base leading-7 sm:text-lg md:text-xl font-display"
      >
        We start by understanding how your business works, then build the right digital solutions to help you operate more efficiently.
      </p>

      <div class="hidden lg:flex flex-row w-fit gap-5 text-sm">
        <div class="flex flex-row-reverse gap-2 font-semibold items-center">
          <p>Discovery first approach</p>
          <Telescope class="text-primary bg-primary/10 p-1 rounded"/>
        </div>
        <div class="flex flex-row-reverse gap-2 font-semibold items-center">
          <p>Tailored solutions</p>
          <Cpu class="text-primary bg-primary/10 p-1 rounded"/>
        </div>
        <div class="flex flex-row-reverse gap-2 font-semibold items-center">
          <p>Ongoing support</p>
          <LifeBuoy class="text-primary bg-primary/10 p-1 rounded"/>
        </div>
      </div>

      <div class="flex w-full flex-col items-stretch gap-3 sm:w-fit sm:flex-row sm:items-center sm:gap-5">
        <router-link
          to="/services/websites"
          class="contact-btn flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-3 text-white transition-all sm:py-2"
          aria-label="View web development projects by Fynecode"
        >
          Our services
        </router-link>
        <router-link
          to="/projects"
          class="flex flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary hover:text-primary/80 transition-all sm:p-2"
          aria-label="View web development projects by Fynecode"
        >
          See our work
          <ArrowRight size="20" />
        </router-link>
        
      </div>
    </div>

    <!-- Contact form -->
    <div class="relative z-10 w-full max-w-xl lg:flex-1 lg:max-w-none">
      <contactForm />
    </div>
  </section>
</template>
