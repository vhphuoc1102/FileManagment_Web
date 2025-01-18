<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
          :pt="{
      root: {
        class: 'w-[66rem]'
      },
      content: {
        class: 'flex flex-col gap-4'
      }
    }" header="Upload files" modal>
    <FileUpload :maxFileSize="100000000" :multiple="true" accept="image/*" name="demo[]" url="/api/upload"
                @select="onSelectedFiles" @upload="onTemplatedUpload()">
      <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button icon="pi pi-images" outlined rounded severity="secondary" @click="chooseCallback()"></Button>
            <Button :disabled="!files || files.length === 0" icon="pi pi-cloud-upload" outlined rounded
                    severity="success"
                    @click="uploadEvent(uploadCallback)"></Button>
            <Button :disabled="!files || files.length === 0" icon="pi pi-times" outlined rounded severity="danger"
                    @click="clearCallback()"></Button>
          </div>
          <ProgressBar :showValue="false" :value="totalSizePercent" class="md:w-20rem h-1 w-full md:ml-auto">
            <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
          </ProgressBar>
        </div>
      </template>
      <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
        <div class="flex flex-col gap-8 pt-4">
          <div v-if="files.length > 0">
            <h5>Pending</h5>
            <div class="flex flex-wrap gap-4">
              <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                   class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                <div>
                  <img :alt="file.name" height="50" :src="file.objectURL" role="presentation" width="100" />
                </div>
                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name
                  }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge severity="warn" value="Pending" />
                <Button icon="pi pi-times" outlined rounded
                        severity="danger" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" />
              </div>
            </div>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <h5>Completed</h5>
            <div class="flex flex-wrap gap-4">
              <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                   class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                <div>
                  <img :alt="file.name" height="50" :src="file.objectURL" role="presentation" width="100" />
                </div>
                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name
                  }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge class="mt-4" severity="success" value="Completed" />
                <Button icon="pi pi-times" outlined rounded severity="danger"
                        @click="removeUploadedFileCallback(index)" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
          <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="secondary" type="button" @click="close" />
      <Button label="Save" type="button" @click="onSave" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { usePrimeVue } from 'primevue/config'
import { useToast } from 'primevue/usetoast'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import * as fileApi from '@/apis/file'
import { CHUNK_SIZE } from '@/constants'
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import { v4 as uuid } from 'uuid'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const { loadStart, loadDone } = usePageLoading()
const primevue = usePrimeVue()
const toast = useToast()
const folderStore = useFolderStoreWithOut()

const totalSize = ref(0)
const totalSizePercent = ref(0)
const files = ref<File[]>([])
const visible = defineModel<boolean | undefined>()

const onRemoveTemplatingFile = (file: File, removeFileCallback: (index: number) => void, index: number) => {
  removeFileCallback(index)
  totalSize.value -= parseInt(formatSize(file.size))
  totalSizePercent.value = totalSize.value / 10
}

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size))
  })
}

const uploadEvent = (callback: () => void) => {
  totalSizePercent.value = totalSize.value / 10
  callback()
}

const onTemplatedUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}

const formatSize = (bytes: number) => {
  const k = 1024
  const dm = 3
  const sizes = !primevue.config.locale ? [] : primevue.config.locale.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}

const close = () => {
  visible.value = false
}

const onSave = async () => {
  try {
    loadStart()
    for (const file of unref(files)) {
      const UUID = uuid()
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let index = 0
      while (index < totalChunks) {
        const chunk = file.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)
        const request: Recordable = {
          file: chunk,
          fileName: file.name,
          UUID: UUID,
          index: index,
          total: totalChunks,
          directoryId: folderStore.getParentDirectoryId ?? -1
        }
        await fileApi.uploadFile(request)
        index++
      }
    }
    toast.add({ severity: 'success', summary: 'Success', detail: 'Upload success', life: 3000 })
    onReload()
  } finally {
    loadDone()
  }
  close()
}
const onReload = () => {
  window.location.reload()
}
</script>

<style scoped>

</style>
