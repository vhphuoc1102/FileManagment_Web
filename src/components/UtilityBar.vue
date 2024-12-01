<template>
  <div>
    <Button aria-label="Clear selection" icon="pi pi-times" rounded variant="text" />
    <span>
      {{ selectedItemsCount }} selected
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import { useFileStoreWithOut } from '@/stores/modules/file'
import { computed } from 'vue'

// Stores
const folderStore = useFolderStoreWithOut()
const fileStore = useFileStoreWithOut()

// Variables
const selectedItemsCount = computed(() => folderStore.getActivatedFolders.length + fileStore.getActivatedFiles.length)
</script>

<style scoped>

</style>
