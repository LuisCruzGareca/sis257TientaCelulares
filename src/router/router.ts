import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/LoginView.vue')
    },
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
    {
      path: '/colores',
      name: 'colores',
      component: () => import('../views/ColoresView.vue'),
      children: [
        { path: '', component: () => import('../components/colores/coloresList.vue') },
        { path: 'crear', component: () => import('../components/colores/coloresCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/colores/coloresEdit.vue') }
      ]
    },
    {
      path: '/celulares',
      name: 'celulares',
      component: () => import('../views/CelularesView.vue'),
      children: [
        { path: '', component: () => import('../components/celulares/celularesLit.vue') },
        { path: 'crear', component: () => import('../components/celulares/celularesCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/celulares/celularesEdit.vue') }
      ]
    },

    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriasView.vue'),
      children: [
        { path: '', component: () => import('../components/categorias/categoriaList.vue') },
        {
          path: '/categoria/crear',
          component: () => import('../components/categorias/categoriaCreate.vue')
        },
        {
          path: 'editar/:id',
          component: () => import('../components/categorias/categoriaEdit.vue')
        }
      ]
    },
    //

    {
      path: '/compras',
      name: 'compras',
      component: () => import('../views/comprasView.vue'),
      children: [
        { path: '', component: () => import('../components/compras/comprasList.vue') }
        //{
        //  path: '/categoria/crear',
        // component: () => import('../components/categorias/categoriaCreate.vue')
        // },
        // {
        //  path: 'editar/:id',
        //component: () => import('../components/categorias/categoriaEdit.vue')
        // }
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
