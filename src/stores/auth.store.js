import { defineStore } from 'pinia'
import AuthService from '@/utils/auth.util'

const authServ = new AuthService()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null
  }),

  actions: {
    async handleRequest(actionFn, form) {
      this.loading = true
      this.error = null

      try {
        const response = await actionFn(form)
        return response
      } catch (err) {
        this.error = err instanceof Error ? err : new Error(String(err))
        throw this.error // allow component-level handling (e.g., toast)
      } finally {
        this.loading = false
      }
    },

    // 🔐 Admin login
    async adminLogin(form) {
      return this.handleRequest(authServ.adminLogin.bind(authServ), form)
    },

    async forgotPassword(form) {
      return this.handleRequest(authServ.forgotPassword.bind(authServ), form)
    },

    async resetPassword(form) {
      return this.handleRequest(authServ.resetPassword.bind(authServ), form)
    },

    // 👤 Client login
    async clientLogin(form) {
      return this.handleRequest(authServ.clientLogin.bind(authServ), form)
    },

    // 📧 Verify client email
    async verifyClientEmail(form) {
      return this.handleRequest(authServ.verifyClientEmail.bind(authServ), form)
    },

    // 🔄 Reset PIN
    async resetPin(form) {
      return this.handleRequest(authServ.resetPin.bind(authServ), form)
    },

    // 🧠 Validate password (admin)
    async validatePassword(form) {
      return this.handleRequest(authServ.validatePassword.bind(authServ), form)
    }
  }
})
