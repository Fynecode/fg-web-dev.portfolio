<template>
  <admin-nav />
  <main class="w-full min-h-screen text-white px-6 py-12 pt-20 flex justify-center">
    <section class="w-full max-w-3xl bg-white/5 border border-white/10 rounded-xl p-6 md:p-10">
      <header class="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 class="text-3xl font-semibold">Profile</h1>
          <p class="text-white/60 text-sm mt-1">Basic account information</p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="bg-white/10 hover:bg-white/20 transition p-2 rounded"
            @click="openModal('details')"
            aria-label="Edit profile"
            title="Edit profile"
          >
            <UserPen class="w-4 h-4" />
          </button>
          <button
            type="button"
            class="bg-white/10 hover:bg-white/20 transition p-2 rounded"
            @click="openModal('password')"
            aria-label="Change password"
            title="Change password"
          >
            <Lock class="w-4 h-4" />
          </button>
        </div>
      </header>

      <div v-if="user" class="space-y-6">
        <div class="flex items-center gap-4">
          <User class="w-5 h-5 text-white/70" />
          <div>
            <p class="text-white/60 text-xs uppercase tracking-wide">Name</p>
            <p class="text-lg">{{ user.name }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <Mail class="w-5 h-5 text-white/70" />
          <div>
            <p class="text-white/60 text-xs uppercase tracking-wide">Email</p>
            <p class="text-lg">{{ user.email }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <Shield class="w-5 h-5 text-white/70" />
          <div>
            <p class="text-white/60 text-xs uppercase tracking-wide">Role</p>
            <p class="text-lg capitalize">{{ user.role || 'admin' }}</p>
          </div>
        </div>

      </div>

      <div v-else class="text-white/60">Loading profile…</div>
    </section>
  </main>

  <Teleport to="body">
    <editAdminProfile
      v-if="modalOpen"
      :initial-tab="activeTab"
      @close="modalOpen = false"
    />
  </Teleport>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { User, Mail, Shield, UserPen, Lock } from 'lucide-vue-next'
import adminNav from '@/components/admin-nav.vue'
import { useAdminStore } from '@/stores/user'
import editAdminProfile from '@/components/admin-comps/edit-admin-profile.vue'

const adminStore = useAdminStore()
const user = computed(() => adminStore.user)
const modalOpen = ref(false)
const activeTab = ref('details')

const openModal = (tab) => {
  activeTab.value = tab
  modalOpen.value = true
}

onMounted(async () => {
  if (!adminStore.user) {
    try {
      await adminStore.initAdmin()
    } catch (err) {
      // keep UI simple; auth guard can handle redirect if needed
    }
  }
})
</script>
