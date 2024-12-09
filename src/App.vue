<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <Toast position="top-right" />
    <ConfirmDialog />
    <component :is="route.meta?.layout || 'div'">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
