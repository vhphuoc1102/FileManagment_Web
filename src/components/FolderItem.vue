<template>
  <a ref="target"
     :class="['flex flex-col items-center w-36 cursor-pointer h-fit pt-6 relative',
    activated || mouseOver ? 'border-2 rounded-md bg-[var(--p-surface-200)] border-[var(--p-primary-500)]' : '']"
     @contextmenu="onRightClick"
     @dblclick="onDbClick"
     @mouseleave="mouseOver = false"
     @mouseover="mouseOver = true"
     @click.exact="onClick"
     @click.ctrl="onCtrlClick"
  >
    <span class="material-icons text-8xl text-[var(--p-primary-500)]">folder</span>
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
</template>

<script lang="ts" setup>
import type { FolderInfo } from '@/types/file'
import { computed, ref } from 'vue'
import { useFolderStoreWithOut } from '@/stores/modules/folder'

// Stores
const folderStore = useFolderStoreWithOut()

// Props
const props = withDefaults(defineProps<FolderInfo>(), {
  name: '',
  directoryId: -1
})

// Variables
const target = ref()
const mouseOver = ref(false)
const activated = computed(() => {
  return folderStore.activatedFolders.includes(props.directoryId)
})
const folderOp = ref()
const folderMenuItems = [
  {
    label: 'Info',
    icon: 'pi pi-info-circle'
  },
  {
    label: 'Download',
    icon: 'pi pi-download'
  },
  {
    label: 'Share',
    icon: 'pi pi-user-plus'
  },
  {
    label: 'Add to album',
    icon: 'pi pi-images'
  },
  {
    label: 'Move to trash',
    icon: 'pi pi-trash'
  }
]
const contextMenu = ref()

// Methods
const onClick = () => {
  folderStore.clearActivatedFolders()
  folderStore.addActivatedFolder(props.directoryId)
}

const onDbClick = () => {
  onClick()
  // Navigate to the child folder
  // Add to breadcrumb
}

const onCtrlClick = () => {
  if (activated.value) {
    folderStore.removeActivatedFolder(props.directoryId)
  } else {
    folderStore.addActivatedFolder(props.directoryId)
  }
}

const toggleFolderOp = (event: MouseEvent) => {
  folderOp.value.toggle(event)
}

const onRightClick = (event: MouseEvent) => {
  contextMenu.value.show(event)
}
</script>

<style scoped>

</style>
