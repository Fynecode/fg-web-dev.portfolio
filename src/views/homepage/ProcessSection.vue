<script setup>
const steps = [
  ['01', 'Discover', 'We learn about your business, goals and challenges.'],
  ['02', 'Plan', 'We create a clear strategy and solution roadmap.'],
  ['03', 'Design', 'We design with simplicity and focus on value.'],
  ['04', 'Build', 'We build, test and refine with you.'],
  ['05', 'Grow', 'We support and help you grow continuously.'],
]
</script>

<template>
  <div class="mx-auto w-full max-w-[1160px] px-5 sm:px-8 md:px-12 lg:px-20">
    <header class="mb-10 flex flex-col items-center text-center">
      <p class="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#e31c79]">Our process</p>
      <h2 class="text-[clamp(1.7rem,3vw,2.1rem)] font-bold">A clear path. Measurable results.</h2>
    </header>
    <div class="process-line relative grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-0">
      <article v-for="step in steps" :key="step[0]" class="relative z-10 grid grid-cols-[3.25rem_1fr] gap-x-4 text-left lg:flex lg:flex-col lg:items-center lg:px-3 lg:text-center">
        <div class="process-number row-span-2 grid size-13 place-items-center text-sm font-bold">{{ step[0] }}</div>
        <h3 class="mb-1 text-base font-bold">{{ step[1] }}</h3>
        <p class="text-sm text-[#4a5573] lg:max-w-[12rem]">{{ step[2] }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.process-line::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.5rem;
  width: 2px;
  background: var(--brand-gradient);
  content: '';
  opacity: .25;
}

.process-number {
  border: 2px solid transparent;
  border-radius: 999px;
  background: linear-gradient(#fff, #fff) padding-box, var(--brand-gradient) border-box;
}

@media (min-width: 1024px) {
  .process-line::before {
    top: 1.5rem;
    right: 10%;
    bottom: auto;
    left: 10%;
    width: auto;
    height: 2px;
  }
}
</style>