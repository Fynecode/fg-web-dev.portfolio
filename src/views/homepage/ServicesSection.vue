<template>
  <section
    class="w-full min-h-screen px-5 py-16 sm:px-8 md:px-12 lg:px-20 flex flex-col justify-center items-center gap-10"
    aria-labelledby="services-title"
  >
    <!-- Section Heading -->
    <header class="flex flex-col gap-2 text-center">
      <p class=" font-semibold text-primary">Our services</p>
      <h2
        id="services-title"
        class="md:text-4xl sm:text-3xl text-2xl font-semibold"
      >
        How we can help your business.
      </h2>

    </header>

    <!-- Services Grid -->
    <div
      class="w-full"
      role="list"
    >
      <div class="w-full grid grid-cols-1 gap-4 md:grid-cols-3" :class="projectType === 1? '':'hidden'">
        <InfoCards
          role="listitem"
          :icon="MonitorSmartphone"
          title="Business Websites"
          description="Professional website that build trust, and turn visitors into customers"
          cta="Let's get your business online"
          :benefit="['Modern & mobile friendly', 'SEO ready', 'Built to convert visitors']"
          route-to="services/websites"
        />

        <InfoCards
          role="listitem"
          :icon="Cog"
          title="Internal Business Tools"
          description="Custom tools that organize your operations and give you control."
          cta="How can we help your business?"
          :benefit="['Built around your workflow', 'Secure & scalable', 'Designed for efficiency']"
          route-to="services/businesstools"
        />

        <InfoCards
          role="listitem"
          :icon="Workflow"
          title="Workflow Automation"
          description="Automate repetitive tasks and connect your tools so everything runs smoothly."
          cta="Let's get that off your plate"
          :benefit="['Automate routine tasks', 'Reduce errors', 'More time for what matters']"
          route-to="services/workflow"
        />
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import InfoCards from '@/components/info.cards.vue'
import { MonitorSmartphone, Cog, Workflow } from 'lucide-vue-next'

const projectType = ref(1)
</script>
