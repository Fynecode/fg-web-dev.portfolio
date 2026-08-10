<script setup>
import { ref } from 'vue'
import { UserRoundSearch, Palette, Code2, Rocket } from 'lucide-vue-next'
import ProcessCard from '@/components/process.cards.vue'

// Add slightly more descriptive text for SEO
const processSteps = ref([
  {
    icon: UserRoundSearch,
    title: 'Discovery',
    description:
      'We analyze your business goals, audience, and requirements to define the project scope and strategy.',
  },
  {
    icon: Palette,
    title: 'Design',
    description:
      'We create intuitive, modern interfaces with a focus on usability, branding, and user experience.',
  },
  {
    icon: Code2,
    title: 'Development',
    description:
      'We build scalable, responsive, and performant web systems using modern technologies.',
  },
  {
    icon: Rocket,
    title: 'Delivery & Support',
    description:
      'We launch your project, monitor performance, and provide ongoing support to ensure success.',
  },
])
</script>

<template>
  <section
    class="flex w-full flex-col gap-10 px-5 sm:px-8 md:px-12 lg:px-20"
    id="process"
    aria-labelledby="process-title"
  >
    <header class="flex flex-col gap-2 text-center">
      <p class="lg:text-2xl font-semibold text-primary">
        Our process
      </p>
      <h2 id="process-title" class="md:text-4xl sm:text-3xl text-2xl font-semibold">
        A simple process. A clear path forward.
      </h2>
      
    </header>

    <div class="timeline relative w-full">

      <div
        v-for="(step,index) in processSteps"
        :key="index"
        class="timeline-item"
        :class="index % 2 === 0 ? 'left' : 'right'"
      >
        <span class="timeline-number translate-y-[70%] absolute text-white font-semibold p-2 rounded-full -translate-x-[0%]" :class="index % 2 === 0 ? 'left-full lg:-translate-x-[50%]' : 'right-full lg:translate-x-[50%]'">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <ProcessCard
          :title="step.title"
          :description="step.description"
          :icon="step.icon"
          :stepNumber="index + 1"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
  .timeline{
    position:relative;
  }

  .timeline::before{
    content:"";

    position:absolute;

    left:50%;

    top:0;

    transform:translateX(-50%);

    width:3px;

    height:100%;

    background:linear-gradient(
        45deg,
        #1459C8,
        #8B3DFF
    );

    opacity:0.5;
  }

  .timeline-item{

    width:50%;

    position:relative;

    padding:0 3rem;

    margin-bottom:5rem;
  }

  .timeline-item.left{

    margin-right:auto;
  }

  .timeline-item.right{

    margin-left:auto;
  }

  .timeline-item.left::before{

    right:-15px;
  }

  .timeline-item.right::before{

    left:-15px;
  }

  .timeline-number{
    background:linear-gradient(
        135deg,
        #1459C8,
        #8B3DFF
    );
  }

  @media (max-width: 767px) {
    .timeline{
      padding-left:2.25rem;
    }

    .timeline::before{
      left:0.75rem;
      transform:none;
    }

    .timeline-item,
    .timeline-item.left,
    .timeline-item.right{
      width:100%;
      margin-left:0;
      margin-right:0;
      margin-bottom:2rem;
      padding:0 0 0 1rem;
    }

    .timeline-number,
    .timeline-item.left .timeline-number,
    .timeline-item.right .timeline-number{
      left:-2.25rem;
      right:auto;
      transform:translateY(70%);
      padding:0.45rem;
      font-size:0.75rem;
    }
  }

</style>
