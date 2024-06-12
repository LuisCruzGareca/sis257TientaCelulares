<script setup lang="ts">
import type { Categorias } from '@/models/Categorias'
import type { Colores } from '@/models/Colores'
import http from '@/plugins/axios'
import { router } from '@/router/router'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const descripcion = ref('')
const marca = ref('')
const modelo = ref('')
const precio = ref('')
const stock = ref('')
const categoria = ref('')
const color = ref('')
const id = router.currentRoute.value.params['id']
let celularColor: number

async function editarCelulares() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombre: nombre.value,
      descripcion: descripcion.value,
      marca: marca.value,
      modelo: modelo.value,
      precio: parseFloat(precio.value),
      stock: parseInt(stock.value),
      categoria: parseInt(categoria.value),
      color: parseInt(color.value)
    })
    .then(() => router.push('/celulares'))
}

async function getCelular() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombre.value = response.data.nombre),
      (descripcion.value = response.data.descripcion),
      (marca.value = response.data.marca),
      (modelo.value = response.data.modelo),
      (precio.value = response.data.precio),
      (stock.value = response.data.stock),
      (categoria.value = response.data.categoria),
      (color.value = response.data.color)
  })
}

var colores = ref<Colores[]>([])
async function getColores() {
  colores.value = await http.get(`/colores`).then((response) => response.data)
}

var categorias = ref<Categorias[]>([])

async function getCategorias() {
  categorias.value = await http.get(`/categorias`).then((response) => response.data)
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getColores()
  getCategorias()
  getCelular()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/celulares">Celulares</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Celulares</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarCelulares">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>

        <div class="form-floating">
          <textarea
            class="form-control"
            v-model="descripcion"
            placeholder="Descripcion"
            required
          ></textarea>

          <label for="descripcion">descripcion</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" v-model="marca" placeholder="Marca" required />
          <label for="Marca">Marca</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" v-model="modelo" placeholder="Modelo" required />
          <label for="modelo">modelo</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" v-model="precio" placeholder="precio" required />
          <label for="precio">precio</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" v-model="stock" placeholder="stock" required />
          <label for="stock">stock</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="categoria" required>
            <option
              v-for="(categoria, index) in categorias.values()"
              :value="categoria.id"
              :key="index"
            >
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
        <div class="form-floating mb-3">
          <select v-model="color" required>
            <option
              v-for="(color, index) in colores.values()"
              :value="color.id"
              :key="index"
              :selected="color.id === celularColor"
            >
              {{ color.nombre }}
            </option>
          </select>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>
