<script setup>
    import { Phone, CheckCircle, Loader2 } from 'lucide-vue-next';
    import { usePublicStore } from '@/stores/public.store'
    import { computed, reactive, ref } from 'vue';

    const props = defineProps({
        showPackage: {
            type: Boolean,
            default: false,
        },
    })

    const publicStore = usePublicStore()
    const res = ref()

    const packageDeliverables = {
        Launch: [
            'A polished one-page or starter website experience',
            'Core brand and messaging layout',
            'Responsive design for mobile, tablet and desktop',
            'Contact and CTA flow that turns visitors into enquiries'
        ],
        Growth: [
            'A multi-section business website experience',
            'Conversion-focused landing pages and content flow',
            'Structured service/product sections and testimonial areas',
            'Performance, SEO and integration improvements'
        ],
        Custom: [
            'A tailored technical solution aligned to your workflow',
            'Advanced dashboards, forms, integrations or client portals',
            'A discovery and solution mapping process for your exact needs',
            'Launch support, QA and implementation guidance'
        ]
    }

    const form = reactive({
        email: '',
        phone: '',
        name: '',
        businessName: '',
        package: '',
        message: ''
    })

    const selectedPackageDeliverables = computed(() => {
        if (!form.package) {
            return []
        }

        return packageDeliverables[form.package] || []
    })

    async function sendEmail(){
        const payload = {
            name: form.name,
            email: form.email,
            message: form.phone ? `${form.message}\n\nPhone: ${form.phone}` : form.message,
            bname: form.businessName,
            bactions: form.phone,
            package: form.package,
        }

        res.value = await publicStore.sendEmail(payload)
    }
</script>

<template>
    <div class="w-full py-10">
        <form @submit.prevent class="ml-auto rounded-lg text-text1 w-full lg:w-[80%] h-full backdrop-blur-2xl bg-white/60 p-4 flex flex-col justify-center items-center gap-6">
            <div class="w-full flex flex-col gap-1">
                <h2 class="text-2xl font-semibold">Let's talk about your business</h2>
                <p class="text-text2">Tell us a bit about the challenges you're facing.</p>
            </div>

            <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                <label for="name" class="text-text2"></label>
                <input 
                    type="text" 
                    name="name"
                    id="name" 
                    class="bg-white/80 p-2 rounded-lg w-full border border-border"
                    placeholder="John Doe"
                    required
                    minlength="2"
                    pattern="^[A-Za-z\s]+$"
                    title="Name should only contain letters and spaces, minimum 2 characters"
                    v-model="form.name"
                >
            </div>

            <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                <label for="businessName" class="text-text2"></label>
                <input 
                    type="text" 
                    name="businessName"
                    id="businessName"
                    placeholder="Business name"
                    class="bg-white/80 p-2 rounded-lg w-full border border-border"
                    required
                    title="Please enter a valid business name"
                    v-model="form.businessName"
                >
            </div>

            <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                <label for="phone" class="text-text2"></label>
                <input 
                    type="tel"
                    name="phone" 
                    id="phone" 
                    placeholder="Your phone number"
                    class="bg-white/80 p-2 rounded-lg w-full border border-border"
                    required
                    title="Please enter a valid phone number"
                    v-model="form.phone"
                >
            </div>

            <div class="w-full flex flex-col gap-4 md:flex-row md:justify-between">
                <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                    <label for="email" class="text-text2"></label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Your email address"
                        class="bg-white/80 p-2 rounded-lg w-full border border-border"
                        required
                        title="Please enter a valid email address"
                        v-model="form.email"
                    >
                </div>
            </div>

            <div v-if="props.showPackage && !publicStore.success" class="w-full flex flex-col gap-1">
                <label for="package" class="text-text2">Select a package</label>
                <select
                    name="package"
                    id="package"
                    class="bg-white/80 p-2 rounded-lg w-full border border-border"
                    v-model="form.package"
                >
                    <option value="">Choose a package</option>
                    <option value="Launch">Launch</option>
                    <option value="Growth">Growth</option>
                    <option value="Custom">Custom</option>
                </select>

                <div v-if="selectedPackageDeliverables.length" class="rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <p class="mb-2 text-sm font-semibold text-primary">What is included in {{ form.package }}</p>
                    <ul class="space-y-2 text-sm text-text2">
                        <li v-for="deliverable in selectedPackageDeliverables" :key="deliverable" class="flex items-start gap-2">
                            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
                            <span>{{ deliverable }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="!publicStore.success" class="w-full flex flex-col gap-1">
                <label for="message" class="text-text2">How can we help your business?</label>
                <textarea 
                    name="message"
                    id="message"
                    class="bg-white/80 p-2 rounded-lg w-full border border-border"
                    required
                    minlength="10"
                    title="This field must be at least 10 characters long"
                    v-model="form.message"
                ></textarea>
            </div>

            <div
                v-if="publicStore.success"
                class="w-full h-3/5 flex flex-col gap-2 justify-center items-center">
                <CheckCircle size="64" class="bg-green-500 p-4 rounded-full text-white"/>
                <p>Email sent!</p>
            </div>

            <div class="w-full flex flex-row gap-4">
                <button 
                v-if="!publicStore.success"
                @click="sendEmail"
                class="text-white flex flex-row gap-1 items-center font-semibold contact-btn p-2 rounded-lg cursor-pointer"
                >
                <Phone v-if="!publicStore.loading" class="w-4 h-4 mr-2" />
                <Loader2 v-if="publicStore.loading" class="animate-spin"/>
                    Book a discovery call
                </button>
            </div>
        </form>
        
        
    </div>
</template>

<style scoped>
form{
    background:
    rgba(255, 255, 255, 0.322);

    backdrop-filter:
    blur(16px);

    border:
    1px solid rgba(255,255,255,.25);
}
</style>