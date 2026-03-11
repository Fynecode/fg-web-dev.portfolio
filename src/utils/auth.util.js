import BaseService from './base.service.js'

export default class AuthService extends BaseService {
  constructor() {
    super('/api/auth')
    this.client_route = `${import.meta.env.VITE_API_URL}/api/client`
  }

  async adminLogin(form) {
    const res = await this.fetch.post(`${this.base_route}/sign-in`, form)
    if (res.status === 404) throw new Error('Invalid password or email')
    return this.handleResponse(res, 'Failed to validate admin')
  }

  async forgotPassword(form) {
    const res = await this.fetch.post(`${this.base_route}/forgot-password`, form)
    return this.handleResponse(res, 'Failed to request password reset')
  }

  async resetPassword(form) {
    const res = await this.fetch.post(`${this.base_route}/reset-password`, form)
    return this.handleResponse(res, 'Failed to reset password')
  }
}
