<script setup>
import { ref } from 'vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isActiveItem = ref('')
const videoRef = ref(null)

function playVideo() {
  if (videoRef.value) {
    videoRef.value.play()
    isActiveItem.value = 'active-item'
  }
}

function pauseVideo() {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    isActiveItem.value = ''
  }
}
</script>

<template>
  <article
    class="bg-white border border-border w-full p-2 md:p-10 rounded-lg flex flex-col gap-5"
    :aria-labelledby="`project-${project._id}-title`"
  >
    <!-- Project Preview Video -->
    <video
      ref="videoRef"
      :src="project.file.filePath"
      draggable="false"
      class="border-gradient w-full aspect-video object-cover rounded-lg"
      :class="isActiveItem"
      preload="metadata"
      muted
      playsinline
      :aria-label="`Preview of ${project.title} web project`"
      @mouseover="playVideo"
      @mouseleave="pauseVideo"
    >
      Your browser does not support the video tag.
    </video>

    <!-- Project Details -->
    <div class="flex flex-col gap-2">
      <h3
        :id="`project-${project._id}-title`"
        class="text-lg font-semibold"
      >
        {{ project.title }}
      </h3>
      <p class="text-sm text-text2">
        {{ project.description }}
      </p>
      <p class="text-sm bg-slate-400 text-white py-1 px-2 rounded-full w-fit">
        {{ project.serviceType }}
      </p>
      <a
        :href="project.link"
        class="cursor-pointer text-sm text-text2 hover:text-primary transition-colors duration-300"
      >
        Project link
        <ArrowRightIcon class="inline-block w-4 h-4 ml-1" />
      </a>
    </div>
  </article>
</template>
