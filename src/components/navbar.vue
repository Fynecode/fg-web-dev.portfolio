<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { Phone, ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  isNavVisible: Boolean,
  activeSection: String,
  hero: String,
  projects: String,
  process: String,
  contact: String,
  services: String
});

const route = useRoute();

const isMenuOpen = ref(false);
const isServicesMenuOpen = ref(false);
const servicesMenuRef = ref(null);

watch(props.isNavVisible, (val) => {
  if (!val) {
    isMenuOpen.value = false;
    isServicesMenuOpen.value = false;
  }
});

watch(() => route.fullPath, () => {
  isMenuOpen.value = false;
  isServicesMenuOpen.value = false;
});

function closeMenu() {
  isMenuOpen.value = false;
}

function closeServicesMenu() {
  isServicesMenuOpen.value = false;
}

function toggleServicesMenu() {
  isServicesMenuOpen.value = !isServicesMenuOpen.value;
}

function handleClickOutside(event) {
  if (servicesMenuRef.value && !servicesMenuRef.value.contains(event.target)) {
    closeServicesMenu();
  }
}

onMounted(() => {
  window.addEventListener('scroll', closeMenu);
  window.addEventListener('click', handleClickOutside);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeServicesMenu();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', closeMenu);
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav
    id="fynecode-nav"
    class="fixed text-text1 top-0 left-0 w-full z-40 bg-white shadow-lg transition-all duration-300"
    :class="props.isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
  >
    <div class="flex items-center justify-between px-6 lg:px-20 py-4">

      <!-- Logo -->
      <div class="flex items-center gap-3 font-bold">
        <img src="/logo.svg" class="h-6 w-6" />
        <span>FYNECODE</span>
      </div>

      <!-- Mobile Toggle Button -->
      <div class="lg:hidden flex flex-row gap-2 justify-center items-center">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class=" focus:outline-none"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <router-link to="/contact" class="text-white contact-btn text-xs py-2 px-3 rounded cursor-pointer">
          Book a discovery call
        </router-link>
      </div>

      <!-- Desktop Links -->
      <ul class="hidden lg:flex font-semibold gap-10 items-center">
        <li><router-link to="/" :class="{'text-primary underline underline-offset-1': route.name === 'home'}">Home</router-link></li>
        <li class="relative" ref="servicesMenuRef">
          <button
            type="button"
            class="flex items-center gap-1 cursor-pointer"
            :class="route.path.includes('/services') ? 'text-primary underline underline-offset-1' : ''"
            @click.stop="toggleServicesMenu"
          >
            Services
            <ChevronDown class="w-4 h-4" />
          </button>

          <div
            v-if="isServicesMenuOpen"
            class="absolute left-0 mt-3 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl"
          >
            <router-link
              to="/services/websites"
              class="block rounded-md px-3 py-2 text-sm text-text1 hover:bg-slate-100 hover:text-primary"
              @click="closeServicesMenu"
            >
              Business Websites
            </router-link>
            <router-link
              to="/services/businesstools"
              class="block rounded-md px-3 py-2 text-sm text-text1 hover:bg-slate-100 hover:text-primary"
              @click="closeServicesMenu"
            >
              Internal Business Tools
            </router-link>
            <router-link
              to="/services/workflow"
              class="block rounded-md px-3 py-2 text-sm text-text1 hover:bg-slate-100 hover:text-primary"
              @click="closeServicesMenu"
            >
              Workflow Automation
            </router-link>
          </div>
        </li>
        <li><router-link to="/projects" :class="{'text-primary underline underline-offset-1': route.name === 'projects'}">Projects</router-link></li>
        <li>
          <router-link to="/contact" class="text-white flex flex-row gap-1 items-center font-semibold contact-btn p-2 rounded-lg cursor-pointer">
            <Phone class="w-4 h-4 mr-2" />
            Let's get you online
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="lg:hidden px-6 pb-6 flex flex-col gap-5"
      >
        <router-link to="/" :class="{'text-primary underline underline-offset-1': route.name === 'home'}">Home</router-link>

        <div class="flex flex-col gap-2">
          <button
            type="button"
            class="flex items-center justify-between text-left"
            :class="route.path.includes('/services') ? 'text-primary underline underline-offset-1' : ''"
            @click.stop="toggleServicesMenu"
          >
            <span>Services</span>
            <ChevronDown class="w-4 h-4" />
          </button>

          <div v-if="isServicesMenuOpen" class="mt-2 flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm">
            <router-link to="/services/websites" class="rounded-md px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-white hover:text-primary" @click="closeServicesMenu">Business Websites</router-link>
            <router-link to="/services/businesstools" class="rounded-md px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-white hover:text-primary" @click="closeServicesMenu">Internal Business Tools</router-link>
            <router-link to="/services/workflow" class="rounded-md px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-white hover:text-primary" @click="closeServicesMenu">Workflow Automation</router-link>
          </div>
        </div>

        <router-link to="/projects" :class="{'text-primary underline underline-offset-1': route.name === 'projects'}">Projects</router-link>
      </div>
    </transition>
  </nav>
</template>