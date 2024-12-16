<template>
  <div>
    <ProgressBar v-if="pageLoading" class="rounded-none" mode="indeterminate" style="height: 6px" />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'

// Stores
const appStore = useAppStore()

// Variables
const pageLoading = computed(() => appStore.getPageLoading)
</script>
