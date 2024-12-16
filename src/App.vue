<script lang="ts" setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <div>
    <Toast position="top-right" />
    <ConfirmDialog />
    <RouterView />
  </div>
</template>

<style scoped></style>
