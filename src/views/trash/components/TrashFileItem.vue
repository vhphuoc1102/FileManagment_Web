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
    <Image :preview="false" :src="image" alt="Image" imageClass="h-40" />
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
  <Dialog v-if="deleteVisible" v-model:visible="deleteVisible" :blockScroll="true" :closable="false"
          :dismissableMask="true"
          :draggable="false"
          :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }" header="Confirm" modal>
    <span>Do you sure want to delete ?</span>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="danger" type="button" @click="closeDelete" />
      <Button label="Yes, I'm sure" type="button" @click="deleteTrash" />
    </div>
  </Dialog>
  <ContextMenu ref="contextMenu" :model="folderMenuItems" />
</template>

<script lang="ts" setup>
import type { FileInfo } from '@/types/file'
import { computed, ref } from 'vue'
import { useTrashStoreWithOut } from '@/stores/modules/trash'
import * as trashApi from '@/apis/trash'
import * as toast from '@/composables/toast'

// Stores
const trashStore = useTrashStoreWithOut()

// Props
const props = withDefaults(defineProps<FileInfo>(), {
  name: '',
  fileId: -1,
  file: undefined
})

// Variables
const image = computed(() => `data:image/jpeg;base64,${props.file}`)
const target = ref()
const mouseOver = ref(false)
const activated = computed(() => {
  return trashStore.getActivatedTrashFiles.includes(props.fileId)
})
const folderOp = ref()
const folderMenuItems = [
  {
    label: 'Restore',
    icon: 'pi pi-file-export',
    command: async () => {
      await restore()
    }
  },
  {
    label: 'Move to trash',
    icon: 'pi pi-trash',
    command: () => {
      deleteVisible.value = true
    }
  }
]
const contextMenu = ref()
const deleteVisible = ref(false)

// Methods
const onClick = () => {
  trashStore.clearActivatedTrashFiles()
  trashStore.addActivatedTrashFile(props.fileId)
}

const onDbClick = () => {
  onClick()

  // Preview

  // router.push(`/storage/${props.directoryId}`)
}

const onCtrlClick = () => {
  if (activated.value) {
    trashStore.removeActivatedTrashFile(props.fileId)
  } else {
    trashStore.addActivatedTrashFile(props.fileId)
  }
}

const toggleFolderOp = (event: MouseEvent) => {
  folderOp.value.toggle(event)
}

const onRightClick = (event: MouseEvent) => {
  contextMenu.value.show(event)
}

const closeDelete = () => {
  deleteVisible.value = false
}

const deleteTrash = async () => {
  try {
    await trashApi.deleteTrash({
      fileIds: [props.fileId]
    }).then(() => {
      toast.info('File deleted successfully', '')
    }).catch(() => {
      toast.error('Failed to delete file', '')
    })
  } finally {
    deleteVisible.value = false
  }
}

const restore = async () => {
  await trashApi.restore({
    fileIds: [props.fileId]
  }).then(() => {
    toast.info('File restored successfully', '')
  }).catch(() => {
    toast.error('Failed to restore file', '')
  })
}
</script>

<style scoped>

</style>
