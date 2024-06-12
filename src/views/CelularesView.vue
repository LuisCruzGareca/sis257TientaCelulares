<script setup lang="ts">
import { router } from '@/router/router'

if (!localStorage.getItem('token')) {
  router.push('/')
  window.location.reload()
}
</script>

<template>
  <RouterView ENDPOINT_API="celulares"></RouterView>
</template>
