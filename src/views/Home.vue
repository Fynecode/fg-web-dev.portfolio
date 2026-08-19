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
  
  <main class="home w-full flex flex-col justify-center items-center text-text1">
    <section class="home-section w-full" aria-label="Hero section" id="hero">
      <Hero class="hero" />
    </section>

    <section class="w-full pb-20" aria-label="Services" v-fade-in>
      <ServiceStrip />
    </section>

    <section class="w-full pb-20" aria-label="How Fynecode Development can help businesses" id="services" v-fade-in>
      <Services />
    </section>

    <section class="w-full pb-20 pt-4" aria-label="Fynecode approach" v-fade-in>
      <div class="mx-auto w-full max-w-[1160px] px-5 text-center sm:px-8 md:px-12 lg:px-20">
        <p class="gradient1 text-6xl font-extrabold leading-none">&ldquo;</p>
        <h2 class="mx-auto mt-4 max-w-xl text-[clamp(1.5rem,3vw,2rem)] font-bold leading-relaxed">Great solutions start with great <span class="gradient1">conversations.</span></h2>
        <div class="mx-auto mt-5 h-1 w-16 rounded-full bg-[var(--brand-gradient)]"></div>
      </div>
    </section>

    <section class="w-full pb-20" aria-label="Our process" id="process" v-fade-in>
      <Process />
    </section>

    <section class="w-full pb-20" aria-label="Signs you need a better solution" id="custom" v-fade-in>
      <Signals />
    </section>

    <section class="projects-section w-full" aria-label="Featured projects" id="projects" v-fade-in>
      <ProjectsView />
    </section>

    <section class="w-full px-5 pb-20 sm:px-8 md:px-12 lg:px-20" aria-label="Call to action" id="cta" v-fade-in>
      <div class="mx-auto w-full max-w-[1160px]">
        <div class="flex flex-col items-start justify-between gap-8 rounded-3xl contact-btn p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:px-14">
          <div>
            <h2 class="max-w-lg text-2xl font-bold">Let's build the right solution for your business.</h2>
            <p class="mt-2 text-sm text-white/85">Book a discovery call and let's start the conversation.</p>
          </div>
          <router-link to="/contact" class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#8a3fe0] transition-transform hover:-translate-y-0.5 sm:w-auto">Book a discovery call</router-link>
        </div>
      </div>
    </section>

    <section class="mt-8 w-full border-t border-[#e6e8f2] bg-white p-8 text-[#101f3d]" aria-label="Footer" id="contact">
      <Footer />
    </section>
  </main>
</template>

<script setup>
  import Hero from './homepage/HeroSection.vue';
  import Process from './homepage/ProcessSection.vue';
  import ProjectsView from './ProjectsSection.vue';
  import Footer from './Footer.vue';
  import navbar from '@/components/navbar.vue';
  import Services from './homepage/ServicesSection.vue';
  import ServiceStrip from './homepage/ServiceStrip.vue';
  import Signals from './homepage/SignalsSection.vue';
  import { ref, onMounted } from 'vue';

  const isNavVisible = ref(true);
  const activeSection = ref('hero');
  const toggleForm = ref(false)

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

  // onUnmounted(() => {
  //   window.removeEventListener('scroll', handleScroll);
  //   if (observer) observer.disconnect();
  // });
</script>
