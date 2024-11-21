<template>
  <div class="flex">
    <NavigationBar/>
    <slot/>
  </div>
</template>

<script setup lang="ts">

import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
</script>

<style scoped>

</style>
