<template>
  <div v-if="selectedItemsCount > 0" class="rounded-3xl py-1 bg-[--p-surface-200]">
    <Button aria-label="Clear selection" icon="pi pi-times" rounded severity="secondary" variant="text"
            @click="onClose" />
    <span class="ml-2">
      {{ selectedItemsCount }} selected
    </span>
    <Button aria-label="Delete" class="ml-2" icon="pi pi-download" rounded severity="secondary"
            variant="text" />
    <Button aria-label="Restore" class="ml-2" icon="pi pi-file-export" rounded severity="secondary"
            variant="text" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTrashStoreWithOut } from '@/stores/modules/trash'

// Stores
const trashStore = useTrashStoreWithOut()

// Variables
const selectedItemsCount = computed(() => trashStore.getActivatedTrashFiles)

const onClose = () => {
  trashStore.clearActivatedTrashFiles()
}
</script>

<style scoped>

</style>
