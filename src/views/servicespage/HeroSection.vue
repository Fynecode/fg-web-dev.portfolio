<script setup>
import { onMounted, ref, watch } from 'vue'
import { ArrowRight, CogIcon, Cpu, Globe, LifeBuoy, Phone, Telescope, Workflow } from 'lucide-vue-next'

const props = defineProps({
  serviceType: {
    type: String,
    required: true,
  },
})

const info = ref({})

const serviceInfo = {
  websites: {
    icon: Globe,
    title: 'Our Services',
    header: 'Web Development',
    desc: 'We design and build fast, reliable websites that represent your business well and make it easy for customers to take action.',
    image: '/imgs/website_service.png',
  },
  businesstools: {
    icon: CogIcon,
    title: 'Our Services',
    header: 'Internal Business Tools',
    desc: 'Custom business systems designed around your processes, helping you stay organized as your business grows.',
    image: '/imgs/website_service.png',
  },
  workflow: {
    icon: Workflow,
    title: 'Our Services',
    header: 'Workflow Automation',
    desc: 'Automate everyday tasks and connect your existing tools to improve efficiency and reduce manual effort.',
    image: '/imgs/website_service.png',
  },
}

const service = () => {
  info.value = serviceInfo[props.serviceType] || serviceInfo.websites
}

watch(
  () => props.serviceType,
  () => service(),
  { immediate: true },
)

onMounted(() => service())
</script>

<template>
  <section
    class="w-full bg-[#fafafc] px-5 pb-16 pt-28 sm:px-8 md:px-12 lg:px-20 lg:pb-20"
    aria-labelledby="hero-heading"
  >
    <div class="mx-auto grid w-full max-w-[1160px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div class="relative z-10 flex w-full max-w-2xl flex-col items-start gap-7">
        <header class="flex flex-col items-start gap-4">
          <div class="grid size-[76px] place-items-center rounded-[22px] bg-gradient-to-br from-[#3c64f4]/10 to-[#e31c79]/10 text-[#8a3fe0]">
            <component v-if="info.icon" :is="info.icon" class="size-10" stroke-width="1.8" />
          </div>
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">{{ info.title }}</p>
          <h1 id="hero-heading" class="text-4xl font-bold leading-tight tracking-normal text-[#101f3d] sm:text-5xl">
            {{ info.header }}
          </h1>
        </header>

        <p class="max-w-xl text-base leading-7 text-[#4a5573] sm:text-lg">
          {{ info.desc }}
        </p>

        <div class="flex w-full flex-col items-stretch gap-3 sm:w-fit sm:flex-row sm:items-center sm:gap-4">
          <router-link
            to="/contact"
            class="contact-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(138,63,224,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(138,63,224,0.65)]"
          >
            <Phone size="17" />
            Book a discovery call
          </router-link>
          <router-link
            to="/projects"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-[#e6e8f2] bg-white px-6 py-3.5 text-sm font-semibold text-[#101f3d] transition-all hover:-translate-y-0.5 hover:text-[#8a3fe0]"
          >
            See our work
            <ArrowRight size="17" />
          </router-link>
        </div>

        <div class="hidden flex-row gap-5 text-sm lg:flex">
          <div class="flex flex-row-reverse items-center gap-2 font-semibold">
            <p>Discovery first approach</p>
            <Telescope class="rounded bg-[#3c64f4]/10 p-1 text-[#3c64f4]" />
          </div>
          <div class="flex flex-row-reverse items-center gap-2 font-semibold">
            <p>Tailored solutions</p>
            <Cpu class="rounded bg-[#8a3fe0]/10 p-1 text-[#8a3fe0]" />
          </div>
          <div class="flex flex-row-reverse items-center gap-2 font-semibold">
            <p>Ongoing support</p>
            <LifeBuoy class="rounded bg-[#e31c79]/10 p-1 text-[#e31c79]" />
          </div>
        </div>
      </div>

      <div class="relative min-h-[280px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#3c64f4]/10 to-[#e31c79]/10 sm:min-h-[360px] lg:min-h-[450px]">
        <div class="service-dots absolute inset-0"></div>
        <component
          v-if="info.icon"
          :is="info.icon"
          class="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 text-[#8a3fe0]/40 sm:size-56"
          stroke-width="1.5"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-dots {
  background-image: radial-gradient(#8a3fe0 1px, transparent 1.5px);
  background-size: 16px 16px;
  opacity: 0.45;
  mask-image: radial-gradient(circle at 75% 25%, black, transparent 65%);
}
</style>
