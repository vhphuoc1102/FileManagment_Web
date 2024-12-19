<template>
  <div class="flex w-full h-screen">
    <div class="grow">
      <NavigationBar class="mb-10" layout="User" />
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>

import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
</script>

<style scoped>

</style>
