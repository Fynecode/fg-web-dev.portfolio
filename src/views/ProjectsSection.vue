<template>
  <section
    class="mx-auto flex w-full max-w-[1160px] flex-col justify-center gap-8 px-5 py-12 sm:px-8 md:px-12 lg:flex-row-reverse lg:gap-10 lg:px-20"
    aria-labelledby="projects-title"
    id="projects"
  >
    <!-- Section Header -->
    <header class="flex w-full max-w-2xl flex-col gap-2 text-center lg:w-1/3 lg:text-left">
      <p class="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#e31c79]">
        Featured projects
      </p>

      <h2
        id="projects-title"
        class="text-2xl font-bold sm:text-3xl md:text-4xl"
      >
        Projects we are proud to have built
      </h2>

        <router-link
          to="/projects"
          class="mt-4 flex flex-row items-center justify-center gap-2 font-semibold text-[#e31c79] hover:underline lg:justify-start"
        >
          View all projects
          <ArrowRight />
        </router-link>
    </header>

    <!-- Projects Grid -->
    <div class="projects-container flex items-center w-full relative lg:flex-1">
      <div
        ref="container"
          class="w-full"
        :class="publicStore.loading || projects.length === 0 ? 'flex justify-center': 'grid md:grid-cols-2 grid-cols-1 gap-5'"
        role="list"
      >
        <FeaturedProjects
          v-if="projects.length && !publicStore.loading"
          v-for="project in projects"
          :key="project.id"
          :project="project"
          role="listitem"
        />

        <Loader2
          v-if="publicStore.loading"
          class="text-primary animate-spin"
          size="108"
        />

        <NotFound
          v-if="projects.length === 0 && !publicStore.loading"
          msg="Projects are currently in development. Check back soon."
        />
      </div>
      
    </div>
  </section>
</template>

<script setup>
import FeaturedProjects from '@/components/featured.projects.vue'
import { Loader2, ArrowRight } from 'lucide-vue-next'
import NotFound from '@/components/not.found.vue'
import { usePublicStore } from '@/stores/public.store'
import { ref, onMounted } from 'vue'

const publicStore = usePublicStore()
const projects = ref([])

onMounted(async () => {
  await publicStore.getProjects()
  projects.value = publicStore.projects.slice(0, 2)
})
</script>