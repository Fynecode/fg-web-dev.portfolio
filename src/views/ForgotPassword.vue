<template>
  <main class="admin-login" aria-label="Forgot Password Page">
    <form @submit="handleSubmit" class="form-container" aria-label="Forgot Password Form">
      <div class="form-header">
        <h2 class="text-white text-4xl">Forgot Password</h2>
      </div>
      <div>
        <div class="floating-label">
          <input ref="emailInput" v-model="form.email" type="text" id="email" name="email" placeholder="" aria-label="Email address"/>
          <label for="email">Email</label>
        </div>
        <button type="submit" class="bg-white p-2 w-[60%] cursor-pointer hover:bg-white/90 transition-all rounded flex flex-row gap-2 justify-center items-center" aria-label="Submit forgot password form">
          <loader2 :class="auth.loading? 'animate-spin':'hidden'"/> Send reset link
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Loader2 } from 'lucide-vue-next'
import { formUtility } from '@/utils/form.utils.js'
import { useAuthStore } from '@/stores/auth.store.js'

const formUtil = new formUtility()
const toast = useToast()
const auth = useAuthStore()
const router = useRouter()

const form = ref({ email: '' })
const emailInput = ref(null)

const handleSubmit = async (event) => {
  event.preventDefault()

  if (!formUtil.isFormComplete(form.value)) {
    toast.error('Email is required')
    await nextTick()
    emailInput.value && emailInput.value.focus()
    return
  }

  if (!formUtil.isEmailValid(form.value.email)) {
    toast.error('Invalid email')
    await nextTick()
    emailInput.value && emailInput.value.focus()
    return
  }

  try {
    await auth.forgotPassword(form.value)
    toast.success('If that email exists, a reset link has been sent.')
    router.push('/forgot-password/sent')
  } catch (error) {
    toast.error(error.message || 'Failed to send reset link')
  }
}
</script>
