<template>
  <div class="flex h-screen w-full">
    <SideBar />
    <div class="grow">
      <NavigationBar />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
import SideBar from '@/layouts/main/components/SideBar.vue'
</script>

<style scoped>

</style>
