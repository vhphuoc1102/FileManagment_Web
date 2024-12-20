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
  </div>
</template>

<script lang="ts" setup>
import type { FileInfoWithStatus, FileTimeGroupInfo } from '@/stores/modules/home'
import { computed, ref, watch } from 'vue'
import { h, render } from 'vue'
import FilePreviewButton from '@/views/home/components/FilePreviewButton.vue'

const fileInfo = defineModel<FileInfoWithStatus>('file', { required: true })
const fileGroup = defineModel<FileTimeGroupInfo>('fileGroup', { required: true })
const image = computed(() => `data:image/jpeg;base64,${fileInfo.value.fileInfo.file}`)
const fileMenus = [
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
</script>

<style scoped>

</style>
