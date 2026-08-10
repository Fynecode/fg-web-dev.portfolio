<script setup>
    import { CheckCircle, Sparkles } from 'lucide-vue-next'

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },

        promo: String,
        discountPrice: String,
        discountReason: String,

        desc: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            required: true
        },

        color: {
            type: String,
            required: true
        }
    });
</script>

<template>
    <div class="flex h-full flex-col gap-4 rounded-lg border border-border bg-white p-4 shadow-md transition-shadow duration-300 sm:p-5 lg:p-6">
        <div v-if="props.promo" class="flex justify-center sm:justify-start">
            <p class="flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-white" :class="`bg-${color}`">
                <Sparkles size="16" class="shrink-0" />
                {{ promo }}
            </p>
        </div>

        <div class="flex flex-1 flex-col gap-3">
            <h3 class="text-lg font-semibold leading-tight" :class="`text-${color}`">{{ props.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-600 sm:text-base">{{ props.desc }}</p>

            <div class="space-y-2">
                <p class="flex flex-col text-2xl font-bold sm:text-3xl md:text-4xl" :class="discountPrice ? 'text-slate-500 line-through' : `text-${color}`">
                    <span class="text-sm font-medium text-slate-500 sm:text-base">From</span>
                    {{ props.price }}
                </p>

                <p v-if="props.discountPrice" class="flex flex-col text-2xl font-bold sm:text-3xl md:text-4xl" :class="`text-${color}`">
                    <span class="text-sm font-medium text-slate-500 sm:text-base">{{ props.discountReason }}</span>
                    {{ props.discountPrice }}
                </p>
            </div>

            <ul class="mt-1 flex flex-1 flex-col gap-2 text-sm text-slate-700 sm:text-base">
                <li v-for="(item, index) in props.list" :key="index" class="flex items-start gap-2">
                    <CheckCircle size="18" class="mt-0.5 shrink-0" :class="`text-${color}`" />
                    <span class="leading-relaxed">{{ item }}</span>
                </li>
            </ul>
        </div>

        <router-link
            to="/contact"
            class="mt-auto w-full rounded-lg border px-6 py-3 text-center text-sm font-medium transition-colors duration-300 sm:text-base"
            :class="`border-${color} hover:opacity-80 text-${color}`"
        >
            Book a call
        </router-link>
    </div>
</template>

<style scoped>
</style>