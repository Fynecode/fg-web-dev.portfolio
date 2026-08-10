<script setup>
    import {Gift, ArrowRight} from 'lucide-vue-next'
    import promotionsCard from '@/components/promotions.card.vue'

    const promotions = [
        {
            title: 'LAUNCH',
            price: 'N$1700',
            desc: 'Perfect for businesses getting started',
            color: 'primary',
            list: [
                'Up to 5 pages',
                'Responsive design',
                'Contact form',
                'WhatsApp integration',
                'Basic SEO setup',
                'Google maps',
                'Google Analytics',
            ]
        },
        {
            title: 'GROWTH',
            price: 'N$3500',
            desc: 'Generate more enquiries and grow',
            color: 'secondary',
            promo: 'POPULAR',
            list: [
                'Everything in launch',
                'Up to 10 pages',
                'Blog / News section',
                'Portfolio / Gallery',
                'Advanced contact forms',
                'Enhanced SEO',
                'Search Console setup',
            ]
        },
        {
            title: 'CUSTOM',
            price: 'Custom quote',
            desc: 'Perfect for businesses getting started',
            color: 'green-500',
            list: [
                'E-commerce',
                'Membership areas',
                'Booking systems',
                'Custom functionality',
                'API & third-party integrations',
                'Multi-language',
                'Ongoing support',
            ]
        }
    ]
</script>

<template>
    <section class="flex flex-col gap-6 py-5 sm:py-8 lg:py-10">
        <header class="flex flex-col gap-4 text-center">
            <p class="font-semibold text-primary">
                WEBSITE PACKAGES
            </p>
            <h2 class="text-2xl font-bold sm:text-3xl md:text-4xl">
                Find the right package for your business
            </h2>
        </header>

        <div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
            <promotionsCard
                v-for="(promotion, index) in promotions"
                :key="index"
                :title="promotion.title"
                :promo="promotion.promo"
                :price="promotion.price"
                :desc="promotion.desc"
                :discount_reason="promotion.discount_reason"
                :color="promotion.color"
                :list="promotion.list"
            />
        </div>

        <div class="flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:text-left lg:gap-8">
            <p class="flex md:flex-row flex-col max-sm:text-center items-center gap-1">
                <span class="flex flex-row items-center gap-1 font-bold text-black">
                    <Gift /> Founding client programme:
                </span>
                Special early-adopter pricing for the first 5 businesses
            </p>
            <router-link class="flex flex-row items-center gap-1 text-secondary">
                Learn more
                <ArrowRight />
            </router-link>
        </div>
    </section>
</template>