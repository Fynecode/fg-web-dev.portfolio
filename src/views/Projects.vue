<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePublicStore } from '@/stores/public.store'
import FeaturedProjects from '@/components/featured.projects.vue'
import Footer from './Footer.vue'
import NotFound from '@/components/not.found.vue'
import navbar from '@/components/navbar.vue'
import { ArrowRight, Filter, Loader2 } from 'lucide-vue-next'

const publicStore = usePublicStore()
const selectedFilter = ref('all')
const isNavVisible = ref(true)
const activeSection = ref('projects')

const filters = [
  { value: 'all', label: 'All projects' },
  { value: 'business_website', label: 'Business websites' },
  { value: 'internal_tool', label: 'Internal tools' },
  { value: 'automated_workflow', label: 'Workflow automation' },
]

const selectedFilterLabel = computed(() => {
  const active = filters.find((filterItem) => filterItem.value === selectedFilter.value)
  return active ? active.label : 'All projects'
})

const filteredProjects = computed(() => {
  if (!selectedFilter.value || selectedFilter.value === 'all') {
    return publicStore.projects
  }

  return publicStore.projects.filter((project) => matchesFilter(project, selectedFilter.value))
})

function matchesFilter(project, filter) {
  const normalizedServiceType = String(project.serviceType || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')

  if (filter === 'business_website') {
    return normalizedServiceType.includes('business') && normalizedServiceType.includes('website')
  }

  if (filter === 'internal_tool') {
    return normalizedServiceType.includes('internal') || normalizedServiceType.includes('tool')
  }

  if (filter === 'automated_workflow') {
    return normalizedServiceType.includes('automated') || normalizedServiceType.includes('workflow')
  }

  return true
}

function selectFilter(filter) {
  selectedFilter.value = filter

  if (filter === 'all') {
    publicStore.getProjects()
    return
  }

  publicStore.getProjects(filter)
}

onMounted(() => {
  publicStore.getProjects()
})
</script>

<template>
  <navbar
    :isNavVisible="isNavVisible"
    :activeSection="activeSection"
    hero="home"
    projects="projects"
    process="process"
    services="services"
    contact="contact"
  />

  <main class="min-h-screen w-full bg-[#fafafc] text-[#101f3d]">
    <section class="px-5 pb-10 pt-28 text-center sm:px-8 md:px-12 lg:px-20">
      <div class="mx-auto w-full max-w-[1160px]">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">Our work</p>
        <h1 class="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-normal text-[#101f3d] sm:text-5xl">
          Projects we are <span class="gradient1">proud to have built.</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#4a5573]">
          A closer look at the websites, internal systems and workflow tools we build to help businesses move with more clarity.
        </p>
      </div>
    </section>

    <section class="px-5 pb-8 sm:px-8 md:px-12 lg:px-20" aria-label="Project filters">
      <div class="mx-auto flex w-full max-w-[1160px] flex-col gap-5 rounded-2xl border border-[#e6e8f2] bg-white p-4 shadow-[0_20px_50px_-35px_rgba(16,31,61,0.22)] md:flex-row md:items-center md:justify-between">
        <div class="inline-flex w-fit items-center gap-2 rounded-full bg-[#f2f3f9] px-4 py-2 text-sm font-semibold text-[#101f3d]">
          <Filter size="16" class="text-[#e31c79]" />
          {{ selectedFilterLabel }}
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="filterItem in filters"
            :key="filterItem.value"
            type="button"
            class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
            :class="selectedFilter === filterItem.value ? 'contact-btn text-white shadow-[0_10px_24px_-14px_rgba(138,63,224,0.65)]' : 'border border-[#e6e8f2] bg-white text-[#4a5573] hover:border-[#8a3fe0] hover:text-[#8a3fe0]'"
            @click="selectFilter(filterItem.value)"
          >
            {{ filterItem.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="px-5 pb-24 sm:px-8 md:px-12 lg:px-20" aria-label="Project list" id="projects">
      <div class="mx-auto w-full max-w-[1160px]">
        <div
          class="w-full"
          :class="publicStore.loading || filteredProjects.length === 0 ? 'flex min-h-80 items-center justify-center' : 'grid grid-cols-1 gap-6 lg:grid-cols-2'"
          role="list"
        >
          <template v-if="filteredProjects.length && !publicStore.loading">
            <FeaturedProjects
              v-for="project in filteredProjects"
              :key="project._id || project.id"
              :project="project"
              role="listitem"
            />
          </template>

          <Loader2
            v-if="publicStore.loading"
            class="animate-spin text-[#8a3fe0]"
            size="80"
          />

          <NotFound
            v-if="filteredProjects.length === 0 && !publicStore.loading"
            msg="Projects are currently in development. Check back soon."
          />
        </div>

        <div class="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#f2f3f9] px-7 py-8 sm:px-10 md:flex-row md:items-center">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">Have something similar in mind?</p>
            <h2 class="mt-2 text-2xl font-bold text-[#101f3d]">Let's map the right build for your business.</h2>
          </div>
          <router-link
            to="/contact"
            class="contact-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-fit"
          >
            Start a conversation
            <ArrowRight size="17" />
          </router-link>
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
