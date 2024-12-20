<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
          :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }"
          :style="{ width: '96vw' }"
          header="Choose images to add"
          modal>
    <div class="p-8">
      <div v-if="selectedItemsCount > 0" class="rounded-3xl py-1 bg-[--p-surface-200]">
        <Button aria-label="Clear selection" icon="pi pi-times" rounded severity="secondary" variant="text"
                @click="onCloseUtility" />
        <span class="ml-2"> {{ selectedItemsCount }} selected </span>
        <Button aria-label="Share" class="ml-2" icon="pi pi-user-plus" rounded severity="secondary"
                variant="text" />
        <Button aria-label="Download" class="ml-2" icon="pi pi-download" rounded severity="secondary"
                variant="text" />
        <Button aria-label="Move" class="ml-2" icon="pi pi-file-export" rounded severity="secondary"
                variant="text" />
        <Button aria-label="Trash" class="ml-2" icon="pi pi-trash" rounded severity="secondary" variant="text" />
      </div>
      <div class="flex flex-wrap gap-10">
        <div v-for="(group, index) in groups" :key="index">
          <FileTimeGroup v-model="groups[index]" />
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Back" severity="secondary" type="button" @click="onBack" />
      <Button label="Cancel" severity="danger" type="button" @click="onClose" />
      <Button label="Save" type="button" @click="onSave" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { FileInfoWithStatus, FileTimeGroupInfo } from '@/stores/modules/home'
import FileTimeGroup from '@/views/home/components/FileTimeGroup.vue'
import * as fileApi from '@/apis/file'

const emit = defineEmits(['back'])
const selectedItemsCount = computed(() => groups.value.reduce((acc, group) => {
  return acc + group.files.filter(file => file.activated).length
}, 0))
const visible = defineModel<boolean | undefined>()
const props = defineProps({
  creatingAlbumInfo: {
    type: Object as () => {
      name: string,
      description: string
    }
  }
})
const groups = ref<FileTimeGroupInfo[]>([])

onMounted(async () => {
  const result = await fileApi.getFileGroups({
    storageFileKind: 1
  })
  if (result && result.length > 0) {
    const fileGroups: FileTimeGroupInfo[] = []
    result.forEach(group => {
      fileGroups.push({
        activatedAll: false,
        time: group.uploadTs,
        files: group.files ? group.files.map(file => {
          return {
            fileInfo: {
              name: file.fileName,
              fileId: file.fileId,
              file: file.fileContent
            },
            activated: false
          }
        }) : []
      })
    })
    groups.value = fileGroups
  }
})


const onCloseUtility = () => {
  groups.value.map(group => {
    group.activatedAll = false
    group.files.map(file => {
      file.activated = false
    })
  })
}

const onBack = () => {
  onClose()
  emit('back')
}

const onClose = () => {
  visible.value = false
}

const onSave = () => {
}

</script>

<style scoped>

</style>
