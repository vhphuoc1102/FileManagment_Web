<template>
  <div v-if="selectedItemsCount > 0" class="rounded-3xl py-1 bg-[--p-surface-200]">
    <Button aria-label="Clear selection" icon="pi pi-times" rounded severity="secondary" variant="text"
            @click="onClose" />
    <span class="ml-2">
      {{ selectedItemsCount }} selected
    </span>
    <Button aria-label="Share" class="ml-2" icon="pi pi-user-plus" rounded severity="secondary"
            variant="text" />
    <Button aria-label="Download" class="ml-2" icon="pi pi-download" rounded severity="secondary"
            variant="text" />
    <Button aria-label="Trash" class="ml-2" icon="pi pi-trash" rounded severity="secondary" variant="text" />
  </div>
</template>

<script lang="ts" setup>
import { useHomeStoreWithOut } from '@/stores/modules/home'
import { computed } from 'vue'

// Stores
const homeStore = useHomeStoreWithOut()

// Variables
const selectedItemsCount = computed(() => homeStore.getFileTimeGroups.reduce((acc, group) => {
  return acc + group.files.filter(file => file.activated).length
}, 0))

const onClose = () => {
  homeStore.clearActivatedFiles()
}
</script>

<style scoped>

</style>
