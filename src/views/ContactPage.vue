<script setup>
import { ArrowRight, Globe, Mail, PhoneCall } from 'lucide-vue-next'
import ContactForm from '@/components/contact.form.vue'
import navbar from '@/components/navbar.vue'
import { ref } from 'vue'

const isNavVisible = ref(true)
const activeSection = ref('contact')
</script>

<template>
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

  <navbar
    class="navbar"
    :isNavVisible="isNavVisible"
    :activeSection="activeSection"
    hero="home"
    projects="projects"
    process="process"
    services="services"
    contact="contact"
  />

  <main class="w-full min-h-screen bg-white text-text1">
    <section class="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:px-12 lg:px-20 lg:pt-12">
      <div class="absolute inset-0 -z-10">
        <div class="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[140px]"></div>
        <div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-secondary/25 blur-[150px]"></div>
      </div>

      <div class="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div class="flex w-full max-w-xl flex-col gap-6 lg:pt-10">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact us</p>
          <h1 class="text-4xl font-bold leading-tight text-text1 sm:text-5xl">
            Let’s build the next step of your business.
          </h1>
          <p class="max-w-lg text-lg text-text2">
            Tell us what you're trying to simplify, where the friction is, and which package fits the job best.
          </p>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg border border-border bg-white/80 p-4 shadow-sm">
              <div class="mb-2 flex items-center gap-2 text-primary">
                <Mail class="h-4 w-4" />
                <span class="font-semibold">Email</span>
              </div>
              <p class="text-sm text-text2">hello@fynecode.dev</p>
            </div>
            <div class="rounded-lg border border-border bg-white/80 p-4 shadow-sm">
              <div class="mb-2 flex items-center gap-2 text-primary">
                <PhoneCall class="h-4 w-4" />
                <span class="font-semibold">Phone</span>
              </div>
              <p class="text-sm text-text2">+264 81 737 6386</p>
            </div>
            <div class="rounded-lg border border-border bg-white/80 p-4 shadow-sm sm:col-span-2">
              <div class="mb-2 flex items-center gap-2 text-primary">
                <Globe class="h-4 w-4" />
                <span class="font-semibold">Packages</span>
              </div>
              <p class="text-sm text-text2">
                Launch, Growth, and Custom solutions are all available for a discovery call and quote.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full max-w-2xl lg:flex-1">
          <ContactForm :showPackage="true" />
        </div>
      </div>
    </section>

    <section class="px-5 pb-16 sm:px-8 md:px-12 lg:px-20">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">What happens next?</p>
          <h2 class="mt-1 text-2xl font-semibold">We’ll map the right fit for your business.</h2>
        </div>
        <router-link
          to="/"
          class="contact-btn inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-white"
        >
          Back to home
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>
    </section>
  </main>
</template>
