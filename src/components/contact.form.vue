<script setup>
import { CheckCircle, Loader2, Send } from 'lucide-vue-next'
import { usePublicStore } from '@/stores/public.store'
import { reactive, ref } from 'vue'

defineProps({
  showPackage: {
    type: Boolean,
    default: false,
  },
})

const publicStore = usePublicStore()
const res = ref()

const form = reactive({
  email: '',
  phone: '',
  name: '',
  businessName: '',
  service: '',
  message: '',
})

async function sendEmail() {
  const payload = {
    name: form.name,
    email: form.email,
    message: form.phone ? `${form.message}\n\nPhone: ${form.phone}` : form.message,
    bname: form.businessName,
    bactions: form.service || form.phone,
    package: form.service,
  }

  res.value = await publicStore.sendEmail(payload)
}
</script>

<template>
  <div id="form" class="w-full rounded-3xl border border-[#e6e8f2] bg-white px-6 py-8 shadow-[0_24px_60px_-34px_rgba(16,31,61,0.22)] sm:px-10 sm:py-10">
    <div class="mb-7">
      <h2 class="text-[21px] font-bold text-[#101f3d]">Send us a message</h2>
      <p class="mt-1 text-sm text-[#4a5573]">Fill in the form and our team will follow up to schedule your discovery call.</p>
    </div>

    <form @submit.prevent="sendEmail" class="flex w-full flex-col">
      <template v-if="!publicStore.success">
        <div class="grid gap-x-5 sm:grid-cols-2">
          <div class="mb-5">
            <label for="name" class="mb-2 block text-sm font-semibold text-[#101f3d]">Full name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              class="contact-input"
              placeholder="Jane Shikongo"
              required
              minlength="2"
            >
          </div>

          <div class="mb-5">
            <label for="businessName" class="mb-2 block text-sm font-semibold text-[#101f3d]">Company</label>
            <input
              id="businessName"
              v-model="form.businessName"
              type="text"
              name="businessName"
              class="contact-input"
              placeholder="Your business name"
            >
          </div>
        </div>

        <div class="grid gap-x-5 sm:grid-cols-2">
          <div class="mb-5">
            <label for="email" class="mb-2 block text-sm font-semibold text-[#101f3d]">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              class="contact-input"
              placeholder="you@company.com"
              required
            >
          </div>

          <div class="mb-5">
            <label for="phone" class="mb-2 block text-sm font-semibold text-[#101f3d]">Phone number</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              name="phone"
              class="contact-input"
              placeholder="+264 81 000 0000"
            >
          </div>
        </div>

        <div class="mb-5">
          <label for="service" class="mb-2 block text-sm font-semibold text-[#101f3d]">What do you need help with?</label>
          <select id="service" v-model="form.service" name="service" class="contact-input appearance-none bg-white">
            <option value="">Select a service</option>
            <option>Backend Development</option>
            <option>Web Development</option>
            <option>UI/UX Design</option>
            <option>Internal Systems</option>
            <option>Not sure yet</option>
          </select>
        </div>

        <div class="mb-5">
          <label for="message" class="mb-2 block text-sm font-semibold text-[#101f3d]">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            class="contact-input min-h-36 resize-y"
            placeholder="Tell us a little about your business and what you're looking to build..."
            required
            minlength="10"
          ></textarea>
        </div>

        <button
          type="submit"
          class="contact-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(138,63,224,0.55)] transition-all hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60 disabled:hover:translate-y-0"
          :disabled="publicStore.loading"
        >
          <Send v-if="!publicStore.loading" size="17" />
          <Loader2 v-else class="animate-spin" size="17" />
          {{ publicStore.loading ? 'Sending...' : 'Send message' }}
        </button>

        <p class="mt-4 text-xs leading-5 text-[#4a5573]">
          By submitting this form you agree to be contacted about your enquiry. We don't share your details with anyone else.
        </p>
      </template>

      <div v-else class="flex min-h-72 w-full flex-col items-center justify-center gap-3 text-center">
        <CheckCircle size="64" class="rounded-full bg-green-500 p-4 text-white" />
        <p class="font-semibold text-[#101f3d]">Thanks, your message is in.</p>
        <p class="text-sm text-[#4a5573]">We'll be in touch within one business day.</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-input {
  width: 100%;
  border: 1px solid #e6e8f2;
  border-radius: 12px;
  background-color: #fafafc;
  padding: 13px 15px;
  color: #101f3d;
  font-size: 14.5px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.contact-input:focus {
  border-color: #8a3fe0;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(138, 63, 224, 0.1);
}
</style>
