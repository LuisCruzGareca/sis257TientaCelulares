<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { router } from '@/router/router'
import type { Compras } from '@/models/Compras'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var compra = ref<Compras[]>([])

async function getCompras() {
  compra.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/compras/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la compra?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCompras())
  }
}

onMounted(() => {
  getCompras()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Compras</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Compras</h2>
      <div class="col-12">
        <RouterLink to="/compras/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Usuario</th>
            <th scope="col">direccion_envio</th>
            <th scope="col">total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(compras, index) in compra.values()" :key="compras.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ compras.usuario.email }}</td>
            <td>{{ compras.direccion_envio }}</td>
            <td>{{ compras.total }}</td>

            <td>
              <button class="btn btn-link" @click="toEdit(compras.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(compras.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
