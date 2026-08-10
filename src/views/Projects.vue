<template>
  <main>
    <header class="flex flex-col gap-2 contact-btn w-full h-fit px-5 md:px-20 py-10 text-white">
      <span class="flex flex-row gap-2"><router-link to="/"><ArrowLeft /></router-link> ALL PROJECTS</span>
      <h2 class="md:text-4xl sm:text-3xl text-2xl font-semibold">Projects we are proud to have built</h2>
    </header>

    <section class="bg-white w-full flex flex-col gap-4 md:flex-row justify-between items-start md:items-center px-5 md:px-20 py-4 shadow-lg">
      <div class="p-2 text-sm border border-primary text-primary rounded-full">
        <p>{{ selectedFilterLabel }}</p>
      </div>

      <div class="flex flex-wrap gap-5">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          class="text-sm transition-colors duration-200"
          :class="selectedFilter === filter.value ? 'text-primary underline font-semibold' : 'text-text2 hover:text-primary'"
          @click="selectFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>
    </section>

    <section class="px-5 md:px-20 py-10">
      <div class="projects-list">
        <div
          ref="container"
          class="w-full"
          :class="publicStore.loading || filteredProjects.length === 0 ? 'flex justify-center' : 'grid md:grid-cols-2 grid-cols-1 gap-5'"
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
            class="text-primary animate-spin"
            size="108"
          />

          <NotFound
            v-if="filteredProjects.length === 0 && !publicStore.loading"
            msg="Projects are currently in development. Check back soon."
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePublicStore } from '@/stores/public.store'
import FeaturedProjects from '@/components/featured.projects.vue'
import NotFound from '@/components/not.found.vue'
import { Loader2, ArrowLeft } from 'lucide-vue-next'

const publicStore = usePublicStore()
const selectedFilter = ref('all')

const filters = [
  { value: 'all', label: 'All projects' },
  { value: 'business_website', label: 'Business websites' },
  { value: 'internal_tool', label: 'Internal Business Tools' },
  { value: 'automated_workflow', label: 'Workflow Automation' }
]

const selectedFilterLabel = computed(() => {
  const active = filters.find((filter) => filter.value === selectedFilter.value)
  return active ? active.label : 'Filter projects...'
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