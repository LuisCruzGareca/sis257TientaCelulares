<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { router } from '@/router/router'
import type { Celulares } from '@/models/Celulares'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var celular = ref<Celulares[]>([])
//
async function getCelulares() {
  celular.value = await http.get('/celulares').then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/celulares/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el celulares?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCelulares())
  }
}

onMounted(() => {
  getCelulares()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Celulares</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de celulares</h2>
      <div class="col-12">
        <RouterLink to="/celulares/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">nombre</th>
            <th scope="col">descripcion</th>
            <th scope="col">marca</th>
            <th scope="col">modelo</th>
            <th scope="col">stock</th>
            <th scope="col">precio</th>
            <th scope="col">color</th>
            <th scope="col">categoria</th>
            <th scope="col">accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(celular, index) in celular.values()" :key="celular.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ celular.nombre }}</td>
            <td>{{ celular.descripcion }}</td>
            <td>{{ celular.marca }}</td>
            <td>{{ celular.modelo }}</td>
            <td>{{ celular.stock }}</td>
            <td>{{ celular.precio }}</td>
            <td>{{ celular.color }}</td>
            <td>{{ celular.categoria }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(celular.id)">
                Editar
                <font-awesome-icon icon="fa-solid fa-edit" /></button
              ><br />
              <button class="btn btn-link" @click="toDelete(celular.id)">
                Eliminar
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>

        <!-- 

         <tbody>
          <tr v-for="(usuario, index) in usuarios.values()" :key="usuario.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.password }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(usuario.id)">
                Editar
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(usuario.id)">
                Eliminar
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody> -->
      </table>
    </div>
  </div>
</template>

<style scoped></style>
