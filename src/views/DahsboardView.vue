<template>
  <adminNav />
  <div class="dashboard-view w-full h-screen flex flex-col items-center max-sm:px-4 p-12 pt-20 text-white gap-10" aria-label="Dashboard">
    <header class="w-full flex flex-col items-center justify-center gap-10">
      <h1 class="text-4xl max-sm:text-xl">Welcome back {{ user?.name }}</h1>
    </header>
    <div class="pr-0.5 w-[80%] max-sm:w-[95%] max-md:w-[90%] flex flex-col gap-5 items-center" aria-label="Dashboard Content">
      <div class="w-full overflow-x-auto hidden sm:block">
        <table v-if="featuredStore.featuredProjects.length > 0" class="projects-table w-full border-collapse">
          <thead>
            <tr class="text-left text-white/70 border-b border-white/10">
              <th class="py-3 px-3">Title</th>
              <th class="py-3 px-3">Company</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3">Created</th>
              <th class="py-3 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in featuredStore.featuredProjects"
              :key="project._id"
              class="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td class="py-3 px-3 font-semibold">{{ project.title }}</td>
              <td class="py-3 px-3">{{ project.company || '-' }}</td>
              <td class="py-3 px-3 capitalize">{{ project.status }}</td>
              <td class="py-3 px-3">{{ formatDate(project.createdAt) }}</td>
              <td class="py-3 px-3">
                <button
                  class="bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded flex items-center gap-2"
                  @click="viewProject(project._id)"
                >
                  <Eye class="w-4 h-4" /> View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div v-if="featuredStore.featuredProjects.length > 0" class="w-full flex flex-col gap-3 sm:hidden">
        <div
          v-for="project in featuredStore.featuredProjects"
          :key="project._id"
          class="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm text-white/60">Title</p>
              <p class="font-semibold">{{ project.title }}</p>
            </div>
            <button
              class="bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded flex items-center gap-2"
              @click="viewProject(project._id)"
            >
              <Eye class="w-4 h-4" /> View
            </button>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p class="text-white/60">Company</p>
              <p>{{ project.company || '-' }}</p>
            </div>
            <div>
              <p class="text-white/60">Status</p>
              <p class="capitalize">{{ project.status }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-white/60">Created</p>
              <p>{{ formatDate(project.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <notFoundMsg v-if="featuredStore.featuredProjects.length === 0" msg="No projects found, please add some" />
      <button class="bg-navy/60 hover:bg-navy/75 transition-all w-full text-white rounded text-center p-2 flex flex-row justify-center items-center gap-2 border border-navy cursor-pointer" @click="newProject = true"><Plus /> New project</button>
    </div>
    <Teleport to="body">
      <createProject 
        v-if="newProject"
        :create-project="featuredStore.createFeaturedProject.bind(featuredStore)"
        :loading="featuredStore.loading"
        @close="newProject = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
  import adminNav from '@/components/admin-nav.vue';
  import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';
  import createProject from '@/components/projects-comps/create-project.vue';
  import { useAdminStore } from '@/stores/user';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { useFeaturedProjectsStore } from '@/stores/featured.store';

  import { Eye, Plus } from 'lucide-vue-next';

  const featuredStore = useFeaturedProjectsStore()
  const adminStore = useAdminStore()
  const router = useRouter()
 
  const user = adminStore.user

  const newProject = ref(false)

  const viewProject = (id) => {
    router.push(`/projects/featured/${id}`)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString()
  }

  onMounted(async () => {
      await featuredStore.getAllFeaturedProjects()
  })
</script>
