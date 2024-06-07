//Permite definir rutas que mapean URL específicas a componentes específicos

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    //
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuariosVieu.vue'),
      children: [
        { path: '', component: () => import('../components/usuarios/usuarioList.vue') },
        { path: 'crear', component: () => import('../components/usuarios/usuarioCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/usuarios/usuarioEdit.vue') }
      ]
    },

    //

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
