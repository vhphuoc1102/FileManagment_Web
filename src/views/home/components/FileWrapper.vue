<template>
  <div class="cursor-pointer" @contextmenu="onRightClick">
    <div class="relative">
      <Checkbox v-model="fileInfo.activated" :pt="{
        root: {
          class: 'w-full mt-1'
        },
        box: {
          style: 'border-radius: 50%',
          class: 'ml-1 bg-[--p-surface-500]'
        }
      }" binary class="absolute top-0" style="z-index: 2" />
      <Image :src="image" alt="Image" imageClass="h-40" preview
             @show="showPreview" />
      <ContextMenu ref="contextMenu" :model="fileMenus" />
    </div>
    <InfoDrawer v-model="infoVisible" :file-id="fileInfo.fileInfo.fileId" :visible="infoVisible" />
    <ShareDialog v-if="shareVisible" v-model="shareVisible" :resource-id="fileInfo.fileInfo.fileId"
                 :resource-kind="RESOURCE_KIND.FILE"
                 :visible="shareVisible" />
    <Dialog v-if="trashVisible" v-model:visible="trashVisible" :blockScroll="true" :closable="false"
            :dismissableMask="true"
            :draggable="false"
            :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }" header="Confirm" modal>
      <span>Do you sure want to move this image to trash ?</span>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="danger" type="button" @click="closeTrash" />
        <Button label="Yes, I'm sure" type="button" @click="moveToTrash" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { FileInfoWithStatus, FileTimeGroupInfo } from '@/stores/modules/home'
import { computed, ref, unref, watch } from 'vue'
import { h, render } from 'vue'
import FilePreviewButton from '@/views/home/components/FilePreviewButton.vue'
import InfoDrawer from '@/components/InfoDrawer.vue'
import ShareDialog from '@/components/ShareDialog.vue'
import { RESOURCE_KIND } from '@/constants'
import * as fileApi from '@/apis/file'
import * as toast from '@/composables/toast'

const fileInfo = defineModel<FileInfoWithStatus>('file', { required: true })
const fileGroup = defineModel<FileTimeGroupInfo>('fileGroup', { required: true })
const image = computed(() => `data:image/jpeg;base64,${fileInfo.value.fileInfo.file}`)
const infoVisible = ref<boolean>(false)
const shareVisible = ref<boolean>(false)
const trashVisible = ref<boolean>(false)

const fileMenus = [
  {
    label: 'Info',
    icon: 'pi pi-info-circle',
    command: () => {
      infoVisible.value = true
    }
  },
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: async () => {
      try {
        await fileApi.downloadFile({
          fileIds: [fileInfo.value.fileInfo.fileId],
          storageFileType: 0
        }).then(response => {
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
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    label: 'Share',
    icon: 'pi pi-user-plus',
    command: () => {
      shareVisible.value = true
    }
  },
  {
    label: 'Add to album',
    icon: 'pi pi-images'
  },
  {
    label: 'Move to trash',
    icon: 'pi pi-trash',
    command: () => {
      trashVisible.value = true
    }
  }
]
const contextMenu = ref()

watch(() => fileInfo.value.activated, (value) => {
  const fileActivities = new Set(fileGroup.value.files.map(file => file.activated))
  if (!value) {
    fileGroup.value.activatedAll = false
    return
  }

  if (value && fileActivities.size === 1 && fileActivities.has(true)) {
    fileGroup.value.activatedAll = true
  }
})

const showPreview = () => {
  const toolbar = document.querySelector('.p-image-toolbar[data-pc-section="toolbar"]')

  if (toolbar) {
    const vnode = h(FilePreviewButton)
    render(vnode, toolbar)
  }
}

const onRightClick = (event: MouseEvent) => {
  contextMenu.value.show(event)
}

const closeTrash = () => {
  trashVisible.value = false
}

const moveToTrash = async () => {
  try {
    await fileApi.moveToTrash({
      fileIds: [unref(fileInfo).fileInfo.fileId]
    })
  } finally {
    trashVisible.value = false
  }
}
</script>

<style scoped>

</style>
