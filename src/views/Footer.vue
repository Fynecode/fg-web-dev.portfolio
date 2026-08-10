<template>
  <footer class="w-full min-h-full flex flex-col gap-8 px-5" aria-label="Footer">
    <div class="w-full flex flex-col gap-8 lg:flex-row lg:gap-24">
      <header class="flex w-full max-w-2xl flex-col gap-3 lg:max-w-[40%]">
        <div class="flex flex-row items-center gap-3">
          <img src="/logo.svg" alt="" class="w-8"> <h1 class="text-xl font-display">Fynecode Development</h1>
        </div>
        
        <div class="text-slate-400 text-sm">
          <p>We believe good software starts by understanding people. Every project begins with learning how your business works. Sometimes the answer is a website. Sometimes it's automation. Sometimes it's improving an existing system instead of writing code. Our goal remains the same: <strong class="text-white">Reduce manual work. Improve visibility. Create room to grow.</strong></p>
        </div>
      </header>

      <div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <div class="flex flex-col gap-2">
          <h3>Quick links</h3>
          <ol class="list-desc text-sm text-slate-400 flex flex-col gap-1">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/services/websites">Services</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
          </ol>
        </div>

        <div class="flex flex-col gap-2">
          <h3>Services</h3>
          <ol class="list-desc text-sm text-slate-400 flex flex-col gap-1">
            <li><router-link to="/services/websites">Business websites</router-link></li>
             <li><router-link to="/services/businesstools">Internal Business Tools</router-link></li>
            <li><router-link to="/services/workflow">Workflow Automation</router-link></li>
          </ol>
        </div>

        <div class="flex flex-col gap-2">
          <h3>Get in touch</h3>
          <ol class="list-desc text-sm text-slate-400 flex flex-col gap-1">
            <li><a href="tel:+264817376386" class="flex flex-row items-center gap-2"><Phone size="16"/> +264 81 737 6386</a></li>
            <li><a href="mailto:hello@fynecode.com" class="flex flex-row items-center gap-2"><Mail size="16"/> hello@fynecode.com</a></li>
            <li><a href="https://www.google.com/maps/place/Tsumeb,+Namibia" target="_blank" class="flex flex-row items-center gap-2"><MapPin size="16"/> Tsumeb, Namibia</a></li>
          </ol>
        </div>
      </div>

    </div>

    <div class="w-full flex flex-col-reverse items-center gap-4 md:flex-row md:items-center border-t border-border pt-4">
      
      <p class="copy text-slate-400 text-center text-sm self-center w-full">&copy; {{ new Date().getFullYear() }} Fynecode Development. All rights reserved.</p>
    </div>
    
  </footer>
</template>

<script setup>
import { Mail, Phone, MapPin } from 'lucide-vue-next';
</script>