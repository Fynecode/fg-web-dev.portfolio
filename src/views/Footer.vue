<template>
  <footer class="flex min-h-full w-full flex-col gap-8 px-5" aria-label="Footer">
    <div class="w-full flex flex-col gap-8 lg:flex-row lg:gap-24">
      <header class="flex w-full max-w-2xl flex-col gap-3 lg:max-w-[40%]">
        <div class="flex flex-row items-center gap-3">
          <img src="/logo.svg" alt="" class="w-8"> <h1 class="text-xl font-display">Fynecode Development</h1>
        </div>
        
        <div class="text-sm text-[#4a5573]">
          <p>We believe good software starts by understanding people. Every project begins with learning how your business works. Sometimes the answer is a website. Sometimes it's automation. Sometimes it's improving an existing system instead of writing code. Our goal remains the same: <strong class="text-[#101f3d]">Reduce manual work. Improve visibility. Create room to grow.</strong></p>
        </div>
      </header>

      <div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <div class="flex flex-col gap-2">
          <h3>Quick links</h3>
          <ol class="flex list-desc flex-col gap-1 text-sm text-[#4a5573]">
            <li><router-link class="transition-colors hover:text-[#e31c79]" to="/">Home</router-link></li>
            <li><router-link class="transition-colors hover:text-[#e31c79]" to="/services/websites">Services</router-link></li>
            <li><router-link class="transition-colors hover:text-[#e31c79]" to="/projects">Projects</router-link></li>
          </ol>
        </div>

        <div class="flex flex-col gap-2">
          <h3>Services</h3>
          <ol class="flex list-desc flex-col gap-1 text-sm text-[#4a5573]">
            <li><router-link class="transition-colors hover:text-[#e31c79]" to="/services/websites">Business websites</router-link></li>
             <li><router-link class="transition-colors hover:text-[#e31c79]" to="/services/businesstools">Internal Business Tools</router-link></li>
            <li><router-link class="transition-colors hover:text-[#e31c79]" to="/services/workflow">Workflow Automation</router-link></li>
          </ol>
        </div>

        <div class="flex flex-col gap-2">
          <h3>Get in touch</h3>
          <ol class="flex list-desc flex-col gap-1 text-sm text-[#4a5573]">
            <li><a href="tel:+264817376386" class="flex flex-row items-center gap-2 transition-colors hover:text-[#e31c79]"><Phone size="16"/> +264 81 737 6386</a></li>
            <li><a href="mailto:hello@fynecode.com" class="flex flex-row items-center gap-2 transition-colors hover:text-[#e31c79]"><Mail size="16"/> hello@fynecode.com</a></li>
            <li><a href="https://www.google.com/maps/place/Tsumeb,+Namibia" target="_blank" class="flex flex-row items-center gap-2 transition-colors hover:text-[#e31c79]"><MapPin size="16"/> Tsumeb, Namibia</a></li>
          </ol>
        </div>
      </div>

    </div>

    <div class="flex w-full flex-col-reverse items-center gap-4 border-t border-[#e6e8f2] pt-4 md:flex-row">
      
      <p class="copy w-full self-center text-center text-sm text-[#4a5573]">&copy; {{ new Date().getFullYear() }} Fynecode Development. All rights reserved.</p>
    </div>
    
  </footer>
</template>

<script setup>
import { Mail, Phone, MapPin } from 'lucide-vue-next';
</script>