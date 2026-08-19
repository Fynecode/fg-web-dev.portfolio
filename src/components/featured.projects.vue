<script setup>
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const isPlaying = ref(false)
const videoRef = ref(null)

function playVideo() {
  if (!videoRef.value) return

  videoRef.value.play()
  isPlaying.value = true
}

function pauseVideo() {
  if (!videoRef.value) return

  videoRef.value.pause()
  videoRef.value.currentTime = 0
  isPlaying.value = false
}
</script>

<template>
  <article
    class="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#e6e8f2] bg-white shadow-[0_20px_50px_-36px_rgba(16,31,61,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(16,31,61,0.28)]"
    :aria-labelledby="`project-${project._id || project.id}-title`"
  >
    <div class="relative overflow-hidden bg-gradient-to-br from-[#3c64f4]/10 to-[#e31c79]/10">
      <video
        ref="videoRef"
        :src="project.file?.filePath"
        draggable="false"
        class="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        :class="isPlaying ? 'opacity-100' : 'opacity-95'"
        preload="metadata"
        muted
        playsinline
        :aria-label="`Preview of ${project.title} project`"
        @mouseover="playVideo"
        @focus="playVideo"
        @mouseleave="pauseVideo"
        @blur="pauseVideo"
      >
        Your browser does not support the video tag.
      </video>
      <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"></div>
    </div>

    <div class="flex flex-1 flex-col gap-4 p-6 sm:p-7">
      <div>
        <p class="mb-3 inline-flex w-fit rounded-full bg-[#f2f3f9] px-3 py-1 text-xs font-semibold text-[#4a5573]">
          {{ project.serviceType }}
        </p>
        <h3
          :id="`project-${project._id || project.id}-title`"
          class="text-xl font-bold leading-snug text-[#101f3d]"
        >
          {{ project.title }}
        </h3>
        <p class="mt-2 text-sm leading-6 text-[#4a5573]">
          {{ project.description }}
        </p>
      </div>

      <a
        v-if="project.link"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#e31c79] transition-colors hover:text-[#8a3fe0]"
      >
        Project link
        <ArrowUpRight size="16" />
      </a>
    </div>
  </article>
</template>
