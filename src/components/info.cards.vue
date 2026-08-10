<script setup>
import { ref, onMounted, computed } from 'vue'
import {ArrowRight, Check} from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  benefit: {
    type: Array,
    required: true
  },
  cta: {
    type: String,
    default: 'Learn more'
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  routeTo: {
    type: String
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
    class="info-card w-full bg-white border border-border text-text1 p-5 flex flex-col gap-4 rounded-lg"
    :aria-labelledby="titleId"
  >
    <div class="flex flex-col gap-4">
      <div class="size-fit p-4 flex items-center justify-center text-primary rounded-lg bg-primary/10">
        <component
          v-if="icon"
          :is="icon"
          class="size-8"
          aria-hidden="true"
        />
      </div>

      <div class="flex flex-col gap-2">
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
      
    </div>
    <ul v-if="props.benefit" class="flex flex-col gap-2 text-text1/80 max-sm:text-sm">
        <li  v-for="(item, index) in props.benefit" :key="index">
          <Check size="16" class="text-primary mr-2 inline" />
          {{ item }}
        </li>
      </ul>

      <router-link :to="routeTo? routeTo : ''" class="text-primary hover:text-primary/80 transition-all flex items-center gap-2">
        {{ props.cta }}
        <ArrowRight size="16" />
      </router-link>
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