<script setup>
import { computed } from 'vue'
import {
  BarChart3,
  Calendar,
  ClipboardList,
  DatabaseZap,
  FileInput,
  FileText,
  Laptop,
  LayoutDashboard,
  Link2,
  Lock,
  Mail,
  MessageSquare,
  Package,
  RefreshCcw,
  Search,
  Smartphone,
  UserCircle,
  Wrench,
  Zap,
} from 'lucide-vue-next'

const props = defineProps({
  serviceType: {
    type: String,
    required: true,
  },
})

const serviceCopy = {
  websites: {
    eyebrow: "What's included",
    title: 'Everything your website needs to work',
    sub: 'A complete build, not just design. Every project includes the following as standard.',
    items: [
      {
        icon: Laptop,
        title: 'Custom design & build',
        desc: 'No generic templates. Every layout is designed around your brand and content.',
      },
      {
        icon: Smartphone,
        title: 'Mobile-first & responsive',
        desc: 'Every page is built and tested across phone, tablet and desktop.',
      },
      {
        icon: Zap,
        title: 'Performance optimized',
        desc: "Fast load times and clean code, so visitors don't bounce before it loads.",
      },
      {
        icon: Search,
        title: 'SEO foundations',
        desc: 'Structured, indexable pages that give you a real shot at ranking.',
      },
      {
        icon: Calendar,
        title: 'Easy content management',
        desc: 'Update text, images and pages yourself without touching code.',
      },
      {
        icon: Wrench,
        title: 'Post-launch support',
        desc: 'We stay on to fix, tweak and improve after your site goes live.',
      },
    ],
  },
  businesstools: {
    eyebrow: "What's included",
    title: 'Practical tools for daily operations',
    sub: 'Purpose-built systems that help your team organize work, track information and reduce scattered admin.',
    items: [
      { icon: LayoutDashboard, title: 'Dashboards', desc: 'Bring your most important business information into one clear place.' },
      { icon: UserCircle, title: 'Client management', desc: 'Keep customer information, communication and history organized.' },
      { icon: Package, title: 'Inventory management', desc: 'Track stock levels, purchases and product movement with greater accuracy.' },
      { icon: ClipboardList, title: 'Project management', desc: 'Plan work, assign tasks and monitor progress from one platform.' },
      { icon: FileText, title: 'File management', desc: 'Store, organize and quickly access important business documents.' },
      { icon: BarChart3, title: 'Reporting & analytics', desc: 'Turn business data into clear, actionable insight.' },
    ],
  },
  workflow: {
    eyebrow: "What's included",
    title: 'Automation that removes repetitive work',
    sub: 'We connect the tools and tasks your business already uses so information moves without constant manual effort.',
    items: [
      { icon: Mail, title: 'Email automation', desc: 'Send emails automatically based on actions, schedules or customer activity.' },
      { icon: MessageSquare, title: 'WhatsApp notifications', desc: 'Keep customers and staff informed with automated messages.' },
      { icon: FileInput, title: 'Form processing', desc: 'Organize and route information submitted through online forms.' },
      { icon: RefreshCcw, title: 'Data synchronization', desc: 'Keep information consistent across the tools your business uses.' },
      { icon: DatabaseZap, title: 'Data management', desc: 'Move and organize business data without repetitive manual work.' },
      { icon: Link2, title: 'Software integrations', desc: 'Connect existing software so information flows automatically.' },
    ],
  },
}

const info = computed(() => serviceCopy[props.serviceType] || serviceCopy.websites)
</script>

<template>
  <section class="w-full bg-[#fafafc] px-5 py-12 sm:px-8 md:px-12 lg:px-20" aria-labelledby="services-title">
    <div class="mx-auto w-full max-w-[1160px]">
      <header class="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#e31c79]">{{ info.eyebrow }}</p>
        <h2 id="services-title" class="text-3xl font-bold tracking-normal text-[#101f3d] md:text-[1.9rem]">
          {{ info.title }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-[#4a5573] sm:text-base">
          {{ info.sub }}
        </p>
      </header>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="item in info.items"
          :key="item.title"
          class="h-full rounded-2xl border border-[#e6e8f2] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,31,61,0.25)]"
        >
          <div class="mb-4 grid size-[46px] place-items-center rounded-[13px] bg-gradient-to-br from-[#3c64f4]/10 to-[#e31c79]/10 text-[#8a3fe0]">
            <component :is="item.icon" class="size-6" stroke-width="1.9" />
          </div>
          <h3 class="mb-2 text-base font-bold text-[#101f3d]">{{ item.title }}</h3>
          <p class="text-sm leading-6 text-[#4a5573]">{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
