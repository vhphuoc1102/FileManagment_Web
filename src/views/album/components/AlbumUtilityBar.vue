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
import { useAlbumStoreWithOut } from '@/stores/modules/album'
import { computed } from 'vue'

// Stores
const albumStore = useAlbumStoreWithOut()

// Variables
const selectedItemsCount = computed(() => albumStore.getActivatedAlbums.length)

const onClose = () => {
  albumStore.clearActivatedAlbums()
}
</script>

<style scoped>

</style>
