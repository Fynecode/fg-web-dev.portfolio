<script setup>
    import {Gift} from 'lucide-vue-next'
    import promotionsCard from '@/components/promotions.card.vue'

    const promotions = [
        {
            title: 'LAUNCH',
            price: 'N$1700',
            desc: 'Perfect for businesses getting started',
            color: 'primary',
            promo: 'FOUNDING CLIENT OFFER',
            discountPrice: 'N$300 - 700',
            discountReason: 'Early adopter price',
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
    <section class="flex flex-col gap-4 py-5 max-sm:px-10">
        <header class="flex flex-col gap-4 text-center">
            <p class="font-semibold text-primary">
                WEBSITE PACKAGES
            </p>
            <h2 class="md:text-4xl sm:text-3xl text-2xl font-bold">
                Find the right package for your business
            </h2>
        </header>

        <div class="w-full h-fit flex flex-col md:flex-row gap-4">
            <promotionsCard
                v-for="(promotion, index) in promotions"
                :key="index"
                :title="promotion.title"
                :promo="promotion.promo"
                :price="promotion.price"
                :desc="promotion.desc"
                :discount-price="promotion.discountPrice"
                :discount-reason="promotion.discountReason"
                :color="promotion.color"
                :list="promotion.list"
            />
        </div>
        <div class="flex flex-col items-center justify-center text-center gap-3 text-sm text-slate-500 sm:flex-row sm:text-left lg:gap-8">
            <p class="flex md:flex-row flex-col max-sm:text-center items-center gap-1">
                <span class="flex flex-row items-center gap-1 font-bold text-black">
                    <Gift /> Founding client programme:
                </span>
                4/5 places left for early-adopter pricing. Special early-adopter pricing for the first 5 businesses.
            </p>
        </div>
    </section>
</template>