<template>
  <div class="flex h-screen w-full">
    <SideBar />
    <div class="grow">
      <NavigationBar />
      <ProgressBar v-if="pageLoading" class="rounded-none" mode="indeterminate" style="height: 6px" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/layouts/main/components/NavigationBar.vue'
import SideBar from '@/layouts/main/components/SideBar.vue'
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'

// Stores
const appStore = useAppStore()

// Variables
const pageLoading = computed(() => appStore.getPageLoading)

</script>

<style scoped>

</style>
