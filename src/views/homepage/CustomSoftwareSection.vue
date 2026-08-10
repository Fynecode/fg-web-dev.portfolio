<script setup>
import { CheckCircle2, CircleQuestionMark, TriangleAlert, Phone } from 'lucide-vue-next';
</script>

<template>
    <section class="w-full px-5 sm:px-8 md:px-12 lg:px-20">
        <div class="custom-software-container relative overflow-hidden rounded-lg text-white w-full flex flex-col items-center gap-6 p-6 sm:p-8 md:gap-10 md:p-10 lg:px-20">
            <CircleQuestionMark class="absolute right-4 top-4 size-20 text-white/15 rotate-12 md:size-30 md:right-[-13%] md:-translate-y-[50%] md:-translate-x-[200%]" />
            <header>
                <h2 class="text-center text-2xl font-semibold leading-tight sm:text-3xl">Is custom software right for your business?</h2>
            </header>
            <div class="hidden md:flex flex-row gap-10 justify-between w-full">
                <div class="flex flex-col gap-5">
                    <h3 class="text-xl font-semibold">You may not need custom software yet if...</h3>
                    <div class="flex flex-row gap-2 items-center">
                        <CheckCircle2 class="inline mr-2" />
                        <p>Your current process works well.</p>
                    </div>

                    <div class="flex flex-row gap-2 items-center">
                        <CheckCircle2 class="inline mr-2" />
                        <p>Information is easy to find.</p>
                    </div>

                    <div class="flex flex-row gap-2 items-center">
                        <CheckCircle2 class="inline mr-2" />
                        <p>Repetitive work isn't slowing down business.</p>
                        
                    </div>

                    <div class="flex flex-row gap-2 items-center">
                        <CheckCircle2 class="inline mr-2" />
                        <p>You have a clear view of daily operations.</p>
                    </div>
                </div>
                <div class="flex flex-col items-start gap-5">
                    <h3 class="text-xl font-semibold">It might be time to improve your systems if...</h3>
                    <div class="flex flex-row-reverse gap-2">
                        <p>The same questions keep getting asked.</p>
                        <TriangleAlert class="inline mr-2" />
                    </div>
                    <div class="flex flex-row-reverse gap-2">
                        <p>Different tools tell different stories.</p>
                        <TriangleAlert class="inline mr-2" />
                    </div>
                    <div class="flex flex-row-reverse gap-2">
                        <p>Every new employee learns differently.</p>
                        <TriangleAlert class="inline mr-2" />
                    </div>
                    <div class="flex flex-row-reverse gap-2">
                        <p>Spreadsheets are doing too much.</p>
                        <TriangleAlert class="inline mr-2" />
                    </div>
                </div>
            </div>
            <router-link to="/contact" class="bg-white text-primary cursor-pointer rounded-lg w-full justify-center px-4 py-3 flex flex-row items-center gap-2 hover:bg-white/90 transition-all sm:w-fit sm:py-2">
                <Phone class="inline mr-2" />
                Not sure? Let's talk about it.
            </router-link>
        </div>
        
    </section>
</template>

<style scoped>
    .custom-software-container{
        background:linear-gradient(
        45deg,
        #002766,
        #3d0099
    );
    }
</style>
