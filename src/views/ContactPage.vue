<script setup>
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-vue-next'
import ContactForm from '@/components/contact.form.vue'
import Footer from './Footer.vue'
import navbar from '@/components/navbar.vue'
import { ref } from 'vue'

const isNavVisible = ref(true)
const activeSection = ref('contact')

const contactDetails = [
  { icon: Phone, label: '+264 81 737 6386', href: 'tel:+264817376386' },
  { icon: Mail, label: 'hello@fynecode.dev', href: 'mailto:hello@fynecode.dev' },
  { icon: Globe, label: 'fynecode.dev', href: '/' },
  { icon: MapPin, label: 'Tsumeb, Namibia' },
]

const nextSteps = [
  ['1', 'We review your message', 'We read every enquiry and reply within one business day.'],
  ['2', 'We book a discovery call', 'A short call to understand your business and what you need.'],
  ['3', 'We send a proposal', 'Clear scope, timeline and pricing with no obligation to proceed.'],
]
</script>

<template>
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

  <main class="min-h-screen w-full bg-[#fafafc] text-[#101f3d]">
    <section class="px-5 pb-5 pt-28 text-center sm:px-8 md:px-12 lg:px-20">
      <div class="mx-auto w-full max-w-[1160px]">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">Get in touch</p>
        <h1 class="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-normal text-[#101f3d] sm:text-5xl">
          Let's start the <span class="gradient1">conversation.</span>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base leading-7 text-[#4a5573]">
          Tell us a bit about your business and what you're trying to solve. We'll get back to you within one business day.
        </p>
      </div>
    </section>

    <section class="px-5 py-14 sm:px-8 md:px-12 lg:px-20" id="contact">
      <div class="mx-auto grid w-full max-w-[1160px] items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ContactForm :showPackage="true" />

        <aside class="flex flex-col gap-5">
          <div class="rounded-[20px] bg-[#f2f3f9] px-7 py-7">
            <h2 class="mb-4 text-base font-bold">Contact details</h2>
            <ul class="flex flex-col gap-3.5">
              <li v-for="detail in contactDetails" :key="detail.label" class="flex items-center gap-3 text-sm font-medium">
                <span class="contact-btn grid size-9 shrink-0 place-items-center rounded-full text-white">
                  <component :is="detail.icon" size="16" />
                </span>
                <a v-if="detail.href" :href="detail.href" class="transition-colors hover:text-[#e31c79]">{{ detail.label }}</a>
                <span v-else>{{ detail.label }}</span>
              </li>
            </ul>
          </div>

          <div class="rounded-[20px] border border-[#e6e8f2] bg-white px-7 py-7">
            <h2 class="mb-4 text-base font-bold">Business hours</h2>
            <div class="flex justify-between border-b border-[#e6e8f2] py-3 text-sm text-[#4a5573]">
              <span>Monday - Friday</span>
              <span class="font-semibold text-[#101f3d]">08:00 - 17:00</span>
            </div>
            <div class="flex justify-between border-b border-[#e6e8f2] py-3 text-sm text-[#4a5573]">
              <span>Saturday</span>
              <span class="font-semibold text-[#101f3d]">By appointment</span>
            </div>
            <div class="flex justify-between py-3 text-sm text-[#4a5573]">
              <span>Sunday</span>
              <span class="font-semibold text-[#101f3d]">Closed</span>
            </div>
          </div>

          <div class="relative grid min-h-52 place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br from-[#3c64f4]/10 to-[#e31c79]/10">
            <div class="map-dots absolute inset-0"></div>
            <div class="relative z-10 flex flex-col items-center gap-3 text-sm font-semibold">
              <MapPin class="size-12 text-[#8a3fe0]" stroke-width="1.7" />
              <span>Tsumeb, Namibia</span>
            </div>
          </div>

          <div class="flex gap-3">
            <a href="#" aria-label="LinkedIn" class="social-link"><Linkedin size="18" /></a>
            <a href="#" aria-label="Facebook" class="social-link"><Facebook size="18" /></a>
            <a href="#" aria-label="Twitter" class="social-link"><Twitter size="18" /></a>
            <a href="#" aria-label="Instagram" class="social-link"><Instagram size="18" /></a>
          </div>
        </aside>
      </div>
    </section>

    <section class="px-5 pb-24 sm:px-8 md:px-12 lg:px-20">
      <div class="mx-auto w-full max-w-[1160px]">
        <header class="mb-11 text-center">
          <h2 class="text-3xl font-bold tracking-normal">What happens after you reach out</h2>
        </header>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article v-for="step in nextSteps" :key="step[0]" class="text-center">
            <div class="mx-auto mb-5 grid size-[52px] place-items-center rounded-full border-2 border-transparent bg-white text-sm font-bold text-[#101f3d] step-num">
              {{ step[0] }}
            </div>
            <h3 class="mb-2 text-base font-bold">{{ step[1] }}</h3>
            <p class="mx-auto max-w-[260px] text-sm leading-6 text-[#4a5573]">{{ step[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <footer class="w-full border-t border-[#e6e8f2] bg-white px-5 py-12 sm:px-8 md:px-12 lg:px-20">
      <div class="mx-auto w-full max-w-[1160px]">
        <Footer />
      </div>
    </footer>
  </main>
</template>

<style scoped>
.map-dots {
  background-image: radial-gradient(#8a3fe0 1px, transparent 1.5px);
  background-size: 15px 15px;
  opacity: 0.42;
  mask-image: radial-gradient(circle at 50% 45%, black, transparent 70%);
}

.social-link {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid #e6e8f2;
  border-radius: 999px;
  background: #fff;
  color: #101f3d;
  transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.social-link:hover {
  border-color: #e31c79;
  color: #e31c79;
  transform: translateY(-2px);
}

.step-num {
  background: linear-gradient(#fff, #fff) padding-box, var(--brand-gradient) border-box;
}
</style>
