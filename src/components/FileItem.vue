<template>
  <a ref="target"
     :class="['flex flex-col items-center w-40 cursor-pointer h-fit pt-6 relative',
    activated || mouseOver ? 'border-2 rounded-md bg-[var(--p-surface-200)] border-[var(--p-primary-500)]' : '']"
     @contextmenu="onRightClick"
     @dblclick="onDbClick"
     @mouseleave="mouseOver = false"
     @mouseover="mouseOver = true"
     @click.exact="onClick"
     @click.ctrl="onCtrlClick"
  >
    <Image :src="image" alt="Image" imageClass="h-40" preview />
    <div class="max-w-full p-1">
      <p class="break-words">{{ props.name }}</p>
    </div>
    <div class="flex items-center absolute top-0 right-0">
      <Button :pt="{
          icon: {
            class: 'text-sm'
          }
                }" aria-controls="overlay_menu" aria-haspopup="true"
              icon="pi pi-ellipsis-v" rounded variant="text" @click="toggleFolderOp" />
      <Menu id="overlay_menu" ref="folderOp" :model="folderMenuItems" :popup="true" :pt=" {
            submenuLabel:  {
              class: 'py-0'
            }
          }" />
    </div>
  </a>
  <ContextMenu ref="contextMenu" :model="folderMenuItems" />
  <InfoDrawer v-model="infoVisible" :file-id="props.fileId" :visible="infoVisible" />
  <ShareDialog v-if="shareVisible" v-model="shareVisible" :resource-id="props.fileId"
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
</template>

<script lang="ts" setup>
import type { FileInfo } from '@/types/file'
import { computed, ref } from 'vue'
import { useFileStoreWithOut } from '@/stores/modules/file'
import InfoDrawer from '@/components/InfoDrawer.vue'
import * as fileApi from '@/apis/file'
import { RESOURCE_KIND } from '@/constants'
import ShareDialog from '@/components/ShareDialog.vue'
import * as toast from '@/composables/toast'

// Stores
const fileStore = useFileStoreWithOut()

// Props
const props = withDefaults(defineProps<FileInfo>(), {
  name: '',
  fileId: -1,
  file: undefined
})

// Variables
const infoVisible = ref<boolean>(false)
const image = computed(() => `data:image/jpeg;base64,${props.file}`)
const target = ref()
const mouseOver = ref(false)
const activated = computed(() => {
  return fileStore.activatedFiles.includes(props.fileId)
})
const folderOp = ref()
const trashVisible = ref()
const shareVisible = ref()
const folderMenuItems = [
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
          fileIds: [props.fileId],
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

// Methods
const onClick = () => {
  fileStore.clearActivatedFiles()
  fileStore.addActivatedFile(props.fileId)
}

const onDbClick = () => {
  onClick()

  // Preview

  // router.push(`/storage/${props.directoryId}`)
}

const onCtrlClick = () => {
  if (activated.value) {
    fileStore.removeActivatedFile(props.fileId)
  } else {
    fileStore.addActivatedFile(props.fileId)
  }
}

const toggleFolderOp = (event: MouseEvent) => {
  folderOp.value.toggle(event)
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
      fileIds: [props.fileId]
    }).then(() => {
      window.location.reload()
    })
  } finally {
    trashVisible.value = false
  }
}
</script>

<style scoped>

</style>
