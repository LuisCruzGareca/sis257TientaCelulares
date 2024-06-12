import { defineStore } from 'pinia'

import http from '@/plugins/axios'
import { router } from '@/router/router'
import { getTokenFromLocalStorage } from '@/assets/helpers'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') || '',
    token: getTokenFromLocalStorage(),
    returnUrl: null || ''
  }),
  getters: {},
  actions: {
    async login(usuario: string, clave: string) {
      await http
        .post('auth/login', {
          email: usuario,
          password: clave
        })
        .then((response) => {
          this.user = response.data.usuario
          this.token = response.data.access_token

          localStorage.setItem('user', this.user || '')
          localStorage.setItem('token', this.token || '')

          router.push('/celulares')
        })
    },
    logout() {
      localStorage.clear()
      this.$reset()
      router.push('login')
    }
  }
})

export { useAuthStore }
