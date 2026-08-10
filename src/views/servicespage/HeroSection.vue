<script setup>
import { onMounted, ref, watch } from 'vue';
import { ArrowRight, Globe, CogIcon, Workflow, Telescope, Cpu, LifeBuoy } from 'lucide-vue-next'
const props = defineProps({
    serviceType: {
        type: String,
        required: true
    }
})

const info = ref({})

const serviceInfo = {
    websites: {
        icon: Globe,
        title: 'Business websites',
        header: 'Create a stronger first impression.',
        desc: 'Professional websites that build trust, showcase your services and help customers take the next step.',
    },
    internalTools: {
        icon: CogIcon,
        title: 'Internal business tools',
        header: 'Build software that fits your business',
        desc: 'Custom business systems designed around your processes, helping you stay organized as your business grows',
    },
    workflow: {
        icon: Workflow,
        title: 'Workflow automation',
        header: 'Spend less time on repetitive work',
        desc: 'Automate everyday tasks and connect your existing tools to improve efficiency and reduce manual effort.',
    }
}

const service = async () => {
    switch (props.serviceType) {
        case 'websites':
                info.value = serviceInfo.websites
            break;
        case 'businesstools':
                info.value = serviceInfo.internalTools
            break;
        case 'workflow':
                info.value = serviceInfo.workflow
            break;
        default:
            info.value = {}
            break;
    }
}

watch(
  () => props.serviceType,
  async () => {
    await service()
  },
  { immediate: true }
)

onMounted(async () => {
    await service()
})
</script>

<template>
  <section
    class="w-full min-h-screen px-5 py-24 sm:px-8 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-center gap-12 lg:gap-10 relative overflow-hidden bg-white"
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
    <div class="relative z-10 flex w-full max-w-2xl flex-col gap-7 lg:items-start lg:text-left lg:gap-7 lg:flex-1">
        <header>
            <div class="flex flex-row items-center gap-2 text-primary">
                <div class="p-2 rounded-full bg-primary/10">
                    <component v-if="serviceType && info.icon" :is="info.icon" />
                </div>
                <p class="uppercase">{{ info.title }}</p>
            </div>
            <h1
                id="hero-heading"
                class="gradient1 text-3xl font-bold leading-tight sm:text-4xl md:text-4xl lg:text-5xl"
            >
                {{info.header}}
            </h1>
        </header>
      <p
        class="max-w-xl text-base leading-7 sm:text-lg md:text-xl font-display"
      >
        {{ info.desc }}
      </p>

      <div class="flex w-full flex-col items-stretch gap-3 sm:w-fit sm:flex-row sm:items-center sm:gap-5">
        <router-link
          to="/contact"
          class="contact-btn flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-3 text-white transition-all sm:py-2"
          aria-label="View web development projects by Fynecode"
        >
          What do you need
          <ArrowRight size="20" />
        </router-link>
        <router-link
          to="/projects"
          class="flex flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary hover:text-primary/80 transition-all sm:p-2"
          aria-label="View web development projects by Fynecode"
        >
          See our work
        </router-link>
        
      </div>

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
    </div>

    <!-- Contact form -->
    <div class="relative z-10 w-full max-w-xl lg:flex-1 lg:max-w-none">
      <img src="/imgs/website_service.png" class="scale-[150%] -translate-x-[20%]"/>
    </div>
  </section>
</template>
