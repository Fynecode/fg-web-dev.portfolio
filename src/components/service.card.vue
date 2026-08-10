<script setup>
    defineProps({
        title: String,
        desc: String,
        icon: {
            type: [Object, Function],
            default: null
        },
    })
</script>

<template>
    <div class="flex flex-col gap-4 items-center shadow-lg border border-border p-4 rounded-lg h-full hover:scale-[105%] transition-all">
        <div class="size-fit p-4 flex items-center justify-center text-primary rounded-lg bg-primary/10">
            <component
                v-if="icon"
                :is="icon"
                class="size-8"
                aria-hidden="true"
            />
        </div>
        <h4 class="text-lg font-bold capitalize">{{ title }}</h4>
        <p class="text-slate-500 text-center">{{ desc }}</p>
    </div>
</template>

<style lang="css" scoped>

</style>