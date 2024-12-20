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
            variant="text" @click="onDownload" />
    <Button aria-label="Trash" class="ml-2" icon="pi pi-trash" rounded severity="secondary" variant="text" />
  </div>
</template>

<script lang="ts" setup>
import { useHomeStoreWithOut } from '@/stores/modules/home'
import { computed } from 'vue'
import * as fileApi from '@/apis/file'
import * as toast from '@/composables/toast'

// Stores
const homeStore = useHomeStoreWithOut()

// Variables
const selectedItemsCount = computed(() => homeStore.getFileTimeGroups.reduce((acc, group) => {
  return acc + group.files.filter(file => file.activated).length
}, 0))

const onClose = () => {
  homeStore.clearActivatedFiles()
}

const onDownload = async () => {
  const activatedFileIds = homeStore.getFileTimeGroups.flatMap(group =>
    group.files.filter(file => file.activated).map(file => file.fileInfo.fileId)
  )
  const response = await fileApi.downloadFile({
    fileIds: activatedFileIds,
    storageFileType: 0
  })

  const contentDisposition = response.headers['content-disposition']
  const fileName = contentDisposition ? contentDisposition.split('filename=')[1].split(';')[0].trim() : 'downloaded_file'

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()

  toast.info('Downloaded successfully', '')
}
</script>

<style scoped>

</style>
