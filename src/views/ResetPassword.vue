<template>
  <main class="admin-login" aria-label="Reset Password Page">
    <form @submit="handleSubmit" class="form-container" aria-label="Reset Password Form">
      <div class="form-header">
        <h2 class="text-white text-4xl">Reset Password</h2>
      </div>
      <div v-if="tokenError" class="text-white/70 text-center space-y-3">
        <p>{{ tokenError }}</p>
        <RouterLink to="/forgot-password" class="underline underline-offset-4">Request a new link</RouterLink>
      </div>
      <div v-else>
        <div class="floating-label">
          <input :type="showNew ? 'text' : 'password'" v-model="form.newPassword" id="newPassword" name="newPassword" placeholder="" aria-label="New Password"/>
          <label for="newPassword">New Password</label>
          <component :is="showNew ? EyeOff : Eye" class="icon" @click="showNew = !showNew" />
        </div>
        <div class="floating-label">
          <input :type="showConfirm ? 'text' : 'password'" v-model="form.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="" aria-label="Confirm Password"/>
          <label for="confirmPassword">Confirm Password</label>
          <component :is="showConfirm ? EyeOff : Eye" class="icon" @click="showConfirm = !showConfirm" />
        </div>
        <button type="submit" class="bg-white p-2 w-[60%] cursor-pointer hover:bg-white/90 transition-all rounded flex flex-row gap-2 justify-center items-center" aria-label="Submit reset password form">
          <loader2 :class="auth.loading? 'animate-spin':'hidden'"/> Reset password
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth.store.js'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const auth = useAuthStore()

const token = route.query.token
const tokenError = ref('')

const form = ref({
  newPassword: '',
  confirmPassword: ''
})

const showNew = ref(false)
const showConfirm = ref(false)

const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}$/

const handleSubmit = async (event) => {
  event.preventDefault()

  if (!token) {
    tokenError.value = 'This reset link is missing or invalid.'
    return
  }

  if (!form.value.newPassword || !form.value.confirmPassword) {
    toast.error('Please fill all fields')
    return
  }

  if (!passwordRegex.test(form.value.newPassword)) {
    toast.error('Password must be at least 12 characters long, contain one number and one symbol')
    return
  }

  if (form.value.newPassword !== form.value.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  try {
    await auth.resetPassword({ token, newPassword: form.value.newPassword })
    toast.success('Password updated')
    router.push('/dashboard')
  } catch (error) {
    const msg = error.message || 'Failed to reset password'
    if (msg.toLowerCase().includes('token')) {
      tokenError.value = 'This reset link is invalid or has expired.'
      return
    }
    toast.error(msg)
  }
}
</script>
