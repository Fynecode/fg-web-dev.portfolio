<script setup>
const steps = [
  ['01', 'Discover', 'We learn about your business, goals and content.'],
  ['02', 'Plan', 'Sitemap, structure and a clear scope.'],
  ['03', 'Design', 'Visual direction and page layouts for your review.'],
  ['04', 'Build', 'Development, content loading and testing.'],
  ['05', 'Launch', 'We go live and stay on for support.'],
]
</script>

<template>
  <section class="w-full bg-[#fafafc] px-5 py-12 sm:px-8 md:px-12 lg:px-20">
    <div class="mx-auto w-full max-w-[1160px]">
      <header class="mb-12 flex flex-col items-center text-center">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">How it works</p>
        <h2 class="text-3xl font-bold tracking-normal text-[#101f3d]">From brief to live site</h2>
      </header>

      <div class="process-track relative grid grid-cols-1 gap-7 lg:grid-cols-5 lg:gap-0">
        <article
          v-for="step in steps"
          :key="step[0]"
          class="relative z-10 grid grid-cols-[52px_1fr] gap-x-4 text-left lg:flex lg:flex-col lg:items-center lg:px-3 lg:text-center"
        >
          <div class="process-num row-span-2 grid size-[52px] place-items-center text-sm font-bold text-[#101f3d]">{{ step[0] }}</div>
          <h3 class="mb-1 text-base font-bold text-[#101f3d]">{{ step[1] }}</h3>
          <p class="text-sm leading-6 text-[#4a5573]">{{ step[2] }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-track::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 25px;
  width: 2px;
  border-radius: 2px;
  background: var(--brand-gradient);
  content: '';
  opacity: 0.25;
}

.process-num {
  border: 2px solid transparent;
  border-radius: 999px;
  background: linear-gradient(#fff, #fff) padding-box, var(--brand-gradient) border-box;
}

@media (min-width: 1024px) {
  .process-track::before {
    top: 25px;
    right: 9%;
    bottom: auto;
    left: 9%;
    width: auto;
    height: 2px;
  }
}
</style>
