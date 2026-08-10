import { defineStore } from 'pinia'

export const usePublicStore = defineStore('project', {
  state: () => ({
    loading: false,
    error: null,
    success: false,
    projects: []
  }),

  actions: {
    async getProjects(filter = null) {
      this.loading = true;
      this.error = null;

      const raw = localStorage.getItem('featured')
      if (raw) {
        const cached = JSON.parse(raw)
        this.projects = cached
      }

      try {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const endpoint = filter
          ? `${import.meta.env.VITE_API_URL}/api/public/${filter}`
          : `${import.meta.env.VITE_API_URL}/api/public?status=published`

        const res = await fetch(endpoint, fetchOptions)

        if (!res.ok) throw new Error('Failed to fetch projects')

        const data = await res.json()
        const featuredList = Array.isArray(data.featuredList) ? data.featuredList : []

        if (!filter) {
          localStorage.setItem('featured', JSON.stringify(featuredList))
        }

        this.projects = featuredList
      } catch (error) {
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async sendEmail(form) {
      this.loading = true;
      this.error = null;
      this.success = false

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/public/email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          }
        )

        if (!res.ok) throw new Error('Failed to send email')

        const data = await res.json()
        this.success = true
        return data.message
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})