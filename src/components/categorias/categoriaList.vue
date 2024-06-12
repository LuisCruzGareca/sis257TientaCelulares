<script setup lang="ts">
import type { Usuario } from '@/models/Usuario'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { router } from '@/router/router'
import type { Categorias } from '@/models/Categorias'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var categoria = ref<Categorias[]>([])

async function getCategoria() {
  categoria.value = await http.get('/categorias').then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/categorias/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la categoria?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCategoria())
  }
}

onMounted(() => {
  getCategoria()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Categoria</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de categoria</h2>
      <div class="col-12">
        <RouterLink to="/categoria/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">descripcion</th>
            <th scope="col">nombre</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in categoria.values()" :key="categoria.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ categoria.descripcion }}</td>
            <td>{{ categoria.nombre }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(categoria.id)">
                Editar
                <font-awesome-icon icon="fa-solid fa-edit" /></button
              ><br />
              <button class="btn btn-link" @click="toDelete(categoria.id)">
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
