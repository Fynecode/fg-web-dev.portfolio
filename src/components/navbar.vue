<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, Menu, Phone, X } from 'lucide-vue-next'

const props = defineProps({
  isNavVisible: Boolean,
  activeSection: String,
  hero: String,
  projects: String,
  process: String,
  contact: String,
  services: String,
})

const route = useRoute()

const isMenuOpen = ref(false)
const isServicesMenuOpen = ref(false)
const servicesMenuRef = ref(null)

const isServicesActive = computed(() => route.path.includes('/services'))

const navLinks = [
  { label: 'Home', to: '/', active: () => route.name === 'home' },
  { label: 'Projects', to: '/projects', active: () => route.name === 'projects' },
]

const serviceLinks = [
  { label: 'Business Websites', to: '/services/websites' },
  { label: 'Internal Business Tools', to: '/services/businesstools' },
  { label: 'Workflow Automation', to: '/services/workflow' },
]

watch(
  () => props.isNavVisible,
  (val) => {
    if (!val) {
      isMenuOpen.value = false
      isServicesMenuOpen.value = false
    }
  },
)

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    isServicesMenuOpen.value = false
  },
)

function closeMenu() {
  isMenuOpen.value = false
}

function closeServicesMenu() {
  isServicesMenuOpen.value = false
}

function toggleServicesMenu() {
  isServicesMenuOpen.value = !isServicesMenuOpen.value
}

function handleClickOutside(event) {
  if (servicesMenuRef.value && !servicesMenuRef.value.contains(event.target)) {
    closeServicesMenu()
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeMenu()
    closeServicesMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', closeMenu, { passive: true })
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', closeMenu)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <nav
    id="fynecode-nav"
    class="fixed left-0 top-0 z-40 w-full border-b border-[#e6e8f2]/80 bg-white/90 text-[#101f3d] shadow-[0_12px_36px_-30px_rgba(16,31,61,0.45)] backdrop-blur-xl transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
    :class="props.isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
  >
    <div class="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-4 sm:px-8 md:px-12 lg:px-0">
      <router-link to="/" class="flex items-center gap-3 font-bold tracking-normal" aria-label="Fynecode home">
        <img src="/logo.svg" alt="" class="h-8 w-8" />
        <span class="text-sm tracking-[0.08em]">FYNECODE</span>
      </router-link>

      <div class="flex items-center gap-3 lg:hidden">
        <router-link to="/contact" class="contact-btn rounded-full px-4 py-2 text-xs font-semibold text-white">
          Book a call
        </router-link>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-[#e6e8f2] bg-white text-[#101f3d] transition-colors hover:border-[#8a3fe0] hover:text-[#8a3fe0]"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" size="21" />
          <X v-else size="21" />
        </button>
      </div>

      <ul class="hidden items-center gap-2 text-sm font-semibold lg:flex">
        <li v-for="link in navLinks.slice(0, 1)" :key="link.to">
          <router-link class="nav-link" :class="{ 'nav-link-active': link.active() }" :to="link.to">
            {{ link.label }}
          </router-link>
        </li>

        <li class="relative" ref="servicesMenuRef">
          <button
            type="button"
            class="nav-link flex items-center gap-1"
            :class="{ 'nav-link-active': isServicesActive }"
            :aria-expanded="isServicesMenuOpen"
            @click.stop="toggleServicesMenu"
          >
            Services
            <ChevronDown class="size-4 transition-transform duration-300" :class="{ 'rotate-180': isServicesMenuOpen }" />
          </button>

          <transition name="nav-pop">
            <div
              v-if="isServicesMenuOpen"
              class="absolute left-0 mt-3 w-64 rounded-2xl border border-[#e6e8f2] bg-white p-2 shadow-[0_24px_60px_-32px_rgba(16,31,61,0.28)]"
            >
              <router-link
                v-for="service in serviceLinks"
                :key="service.to"
                :to="service.to"
                class="block rounded-xl px-4 py-3 text-sm text-[#4a5573] transition-colors hover:bg-[#f2f3f9] hover:text-[#8a3fe0]"
                :class="{ 'bg-[#f2f3f9] text-[#8a3fe0]': route.path === service.to }"
                @click="closeServicesMenu"
              >
                {{ service.label }}
              </router-link>
            </div>
          </transition>
        </li>

        <li v-for="link in navLinks.slice(1)" :key="link.to">
          <router-link class="nav-link" :class="{ 'nav-link-active': link.active() }" :to="link.to">
            {{ link.label }}
          </router-link>
        </li>

        <li class="pl-3">
          <router-link to="/contact" class="contact-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            <Phone size="16" />
            Let's get you online
          </router-link>
        </li>
      </ul>
    </div>

    <transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="lg:hidden border-t border-[#e6e8f2] bg-white/95 px-5 pb-6 pt-3 shadow-[0_24px_60px_-42px_rgba(16,31,61,0.34)] backdrop-blur-xl"
      >
        <div class="mx-auto flex max-w-[1160px] flex-col gap-2">
          <router-link to="/" class="mobile-link" :class="{ 'mobile-link-active': route.name === 'home' }">Home</router-link>

          <button
            type="button"
            class="mobile-link flex items-center justify-between"
            :class="{ 'mobile-link-active': isServicesActive }"
            :aria-expanded="isServicesMenuOpen"
            @click.stop="toggleServicesMenu"
          >
            <span>Services</span>
            <ChevronDown class="size-4 transition-transform duration-300" :class="{ 'rotate-180': isServicesMenuOpen }" />
          </button>

          <transition name="mobile-submenu">
            <div v-if="isServicesMenuOpen" class="flex flex-col gap-1 rounded-2xl bg-[#f2f3f9] p-2">
              <router-link
                v-for="service in serviceLinks"
                :key="service.to"
                :to="service.to"
                class="rounded-xl px-3 py-2.5 text-sm text-[#4a5573] transition-colors hover:bg-white hover:text-[#8a3fe0]"
                :class="{ 'bg-white text-[#8a3fe0]': route.path === service.to }"
                @click="closeServicesMenu"
              >
                {{ service.label }}
              </router-link>
            </div>
          </transition>

          <router-link to="/projects" class="mobile-link" :class="{ 'mobile-link-active': route.name === 'projects' }">Projects</router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.nav-link {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  color: #101f3d;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover {
  background: #f2f3f9;
  color: #8a3fe0;
}

.nav-link-active {
  background: linear-gradient(135deg, rgba(60, 100, 244, 0.1), rgba(227, 28, 121, 0.1));
  color: #8a3fe0;
}

.mobile-link {
  border-radius: 1rem;
  padding: 0.85rem 1rem;
  text-align: left;
  font-weight: 700;
  color: #101f3d;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.mobile-link:hover,
.mobile-link-active {
  background: #f2f3f9;
  color: #8a3fe0;
}

.nav-pop-enter-active,
.nav-pop-leave-active,
.mobile-menu-enter-active,
.mobile-menu-leave-active,
.mobile-submenu-enter-active,
.mobile-submenu-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease, max-height 0.3s ease;
  overflow: hidden;
}

.nav-pop-enter-from,
.nav-pop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.mobile-submenu-enter-from,
.mobile-submenu-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

.mobile-submenu-enter-to,
.mobile-submenu-leave-from {
  max-height: 220px;
}
</style>
