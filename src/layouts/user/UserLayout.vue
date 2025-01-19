<template>
  <div class="flex w-full h-screen">
    <div class="grow">
      <NavigationBar layout="User" />
      <ProgressBar v-if="pageLoading" class="rounded-none" mode="indeterminate" style="height: 6px" />
      <RouterView class="mt-3" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'

// Stores
const appStore = useAppStore()

// Variables
const pageLoading = computed(() => appStore.getPageLoading)
</script>

<style scoped>

</style>
