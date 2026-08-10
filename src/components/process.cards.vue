<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  stepNumber: {
    type: Number,
    required: true
  }
})

const cardRef = ref(null)

// Generate unique ID per card (fixes duplicate IDs)
const titleId = computed(() =>
  `info-card-${props.title.toLowerCase().replace(/\s+/g, '-')}`
)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        cardRef.value.classList.add('card-fade-in')
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (cardRef.value) observer.observe(cardRef.value)
})
</script>

<template>
  <article
    ref="cardRef"
    class="info-card w-full shadow-lg bg-white text-text1 p-4 flex flex-col items-start gap-4 rounded-lg sm:flex-row sm:items-center sm:p-2 sm:rounded-full"
    :aria-labelledby="titleId"
  >

    <component
      v-if="icon"
      :is="icon"
      class="h-12 w-12 shrink-0 text-primary bg-primary/10 rounded-full p-2 sm:h-full sm:w-20"
      aria-hidden="true"
    />

    <div>
      <h3
      :id="titleId"
      class="text-xl max-sm:text-lg font-bold"
      >
        {{ title }}
      </h3>

      <p
        class="text-lg max-sm:text-sm text-text1/80 font-display"
      >
        {{ description }}
      </p>
    </div>

    
  </article>
</template>

<style scoped>
.info-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-fade-in {
  animation: fade-in 0.8s ease forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
