<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import HeroSection from './servicespage/HeroSection.vue';
import StatsSection from './servicespage/StatsSection.vue';
import ServicesSection from './servicespage/ServicesSection.vue';
import ProcessSection from './servicespage/ProcessSection.vue';
import SignalsSection from './servicespage/SignalsSection.vue';
import CtaBand from './servicespage/CtaBand.vue';
import ProjectsSection from './ProjectsSection.vue';
import Footer from './Footer.vue';
import navbar from '@/components/navbar.vue';

const route = useRoute()
const serviceType = ref(route.params.type || '')
const isNavVisible = ref(true);
const activeSection = ref('hero');
const toggleForm = ref(false);
watch(
  () => route.params.type,
  (newType) => {
    serviceType.value = newType || ''
  },
  { immediate: true }
)

let observer;
  onMounted(() => {
    const sections = [
      document.getElementById('hero'),
      document.getElementById('services'),
      document.getElementById('projects'),
      document.getElementById('process'),
      document.getElementById('cta'),
      document.getElementById('contact')
    ];
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
  });

</script>

<template>
    <navbar class="navbar" 
      :isNavVisible="isNavVisible"
      :activeSection="activeSection"
      hero="hero"
      projects="projects"
      process="process"
      services="services"
      @open-contact="toggleForm = true"
    />
    <main class="home flex w-full flex-col items-center justify-center bg-[#fafafc] text-text1">
        <section class="w-full" aria-label="Service hero" id="hero">
            <HeroSection class="hero" :service-type="serviceType" />
        </section>

        <section class="w-full" aria-label="Service stats">
            <StatsSection :service-type="serviceType" />
        </section>

        <section class="w-full" aria-label="Service inclusions" id="services">
            <ServicesSection :service-type="serviceType"/>
        </section>

        <section class="w-full" aria-label="Service process" id="process">
            <ProcessSection />
        </section>

        <section class="w-full" aria-label="Service fit">
            <SignalsSection />
        </section>

        <section class="w-full" aria-label="Related projects" id="projects">
            <ProjectsSection />
        </section>

        <section class="w-full" aria-label="Call to action" id="cta">
            <CtaBand />
        </section>

        <footer class="footer-section w-full border-t border-[#e6e8f2] bg-white px-5 py-12 sm:px-8 md:px-12 lg:px-20" aria-label="Footer" id="contact">
            <div class="mx-auto w-full max-w-[1160px]">
                <Footer />
            </div>
        </footer>
    </main>
</template>
