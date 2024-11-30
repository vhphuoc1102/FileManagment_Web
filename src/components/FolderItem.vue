<template>
  <OnClickOutside @trigger="onClickOutside">
    <a ref="target"
       :class="['flex flex-col items-center w-32 cursor-pointer h-fit',
    activated || mouseOver ? 'border-2 rounded-md bg-[var(--p-surface-200)] border-[var(--p-primary-500)]' : '']"
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
    </a>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import type { FolderInfo } from '@/types/file'
import { computed, ref } from 'vue'
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import { OnClickOutside } from '@vueuse/components'

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

const onClickOutside = () => {
  folderStore.clearActivatedFolders()
}

const onCtrlClick = () => {
  if (activated.value) {
    folderStore.removeActivatedFolder(props.directoryId)
  } else {
    folderStore.addActivatedFolder(props.directoryId)
  }
}
</script>

<style scoped>

</style>
