<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute();

</script>

<template>
  <div>
    <Toast position="top-right" />
    <component :is="route.meta?.layout || 'div'">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
