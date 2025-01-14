<template>
  <div class="flex w-full h-screen">
    <div class="grow">
      <NavigationBar layout="User" />
      <RouterView class="mt-3" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
</script>

<style scoped>

</style>
