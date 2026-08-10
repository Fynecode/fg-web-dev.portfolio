<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import HeroSection from './servicespage/HeroSection.vue';
import ServicesSection from './servicespage/ServicesSection.vue';
import PromotionsSection from './servicespage/PromotionsSection.vue';
import ProjectsSection from './ProjectsSection.vue';
import Footer from './Footer.vue';
import navbar from '@/components/navbar.vue';

const route = useRoute()
const serviceType = ref(route.params.type || '')
const isNavVisible = ref(true);
const activeSection = ref('hero');
const toggleForm = ref(false)

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
    <main class="home w-full flex flex-col justify-center items-center text-text1 gap-8 md:gap-10">
        <section aria-label="Hero section" id="hero">
            <HeroSection class="hero" :service-type="serviceType" />
        </section>

        <section class="services-section px-10 md:px-20" aria-label="Hero section" id="services">
            <ServicesSection class="" :service-type="serviceType"/>
        </section>

        <section class="services-section" aria-label="Hero section" id="services" v-if="serviceType === 'websites'">
            <PromotionsSection class="" />
        </section>

        <section class="services-section" aria-label="Hero section" id="services">
            <ProjectsSection class="" />
        </section>

        <section class="cta-section w-full px-5 sm:px-8 md:px-12 lg:px-20" aria-label="Call to action" id="cta" v-fade-in>
            <div class="cta-container w-full flex flex-col lg:flex-row justify-between items-center gap-5 p-6 sm:p-8 lg:p-10 bg-white border border-border rounded-lg">
                <div class="cta-text text-primary text-center lg:text-left">
                    <h2 class="text-2xl md:text-3xl font-semibold mb-2">
                        Ready to simplify how your business runs?
                    </h2>
                    <p class="text-sm md:text-base">
                        Book a discovery call and let's explore how we can help.
                    </p>
                </div>
                <a
                    href="#hero"
                    class="bg-primary text-white w-full text-center px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 sm:w-fit"
                >
                    Book a call
                </a>
            </div>
        </section>
        <footer class="footer-section" aria-label="Footer" id="contact">
            <Footer class="" />
        </footer>
    </main>
</template>