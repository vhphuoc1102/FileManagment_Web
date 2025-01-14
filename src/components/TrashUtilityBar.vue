<template>
  <div v-if="selectedItemsCount > 0" class="rounded-3xl py-1 bg-[--p-surface-200]">
    <Button aria-label="Clear selection" icon="pi pi-times" rounded severity="secondary" variant="text"
            @click="onClose" />
    <span class="ml-2">
      {{ selectedItemsCount }} selected
    </span>
    <Button aria-label="Delete" class="ml-2" icon="pi pi-trash" rounded severity="secondary"
            variant="text" @click="deleteTrash" />
    <Button aria-label="Restore" class="ml-2" icon="pi pi-file-export" rounded severity="secondary"
            variant="text" @clic="restore" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTrashStoreWithOut } from '@/stores/modules/trash'
import * as trashApi from '@/apis/trash'
import * as toast from '@/composables/toast'

// Stores
const trashStore = useTrashStoreWithOut()

// Variables
const selectedItemsCount = computed(() => trashStore.getActivatedTrashFiles.length)

const onClose = () => {
  trashStore.clearActivatedTrashFiles()
}

const deleteTrash = async () => {
  await trashApi.deleteTrash({ fileIds: trashStore.getActivatedTrashFiles })
    .then(() => {
      toast.info('Deleted successfully',
        '')
    }).catch(() => {
      toast.error('Failed to delete', '')
    })
  trashStore.clearActivatedTrashFiles()
}

const restore = async () => {
  await trashApi.restore({ fileIds: trashStore.getActivatedTrashFiles })
    .then(() => {
      toast.info('Restored successfully',
        '')
    }).catch(() => {
      toast.error('Failed to restore', '')
    })
  trashStore.clearActivatedTrashFiles()
}
</script>

<style scoped>

</style>
