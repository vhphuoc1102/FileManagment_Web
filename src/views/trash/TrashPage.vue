<template>
  <div class="flex flex-col gap-5 w-full mt-4">
    <TrashUtilityBar ref="ignoreRef" class="mb-4" />
    <div>
      <div class="flex flex-wrap gap-3 px-3">
        <TrashFileItem v-for="(fileInfo, index) in trashFiles" :key="index" ref="activeItemRef"
                       v-on-click-outside="onClickOutsideHandler"
                       :file="fileInfo.file" :file-id="fileInfo.fileId" :name="fileInfo.name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TrashUtilityBar from '@/components/TrashUtilityBar.vue'
import { onMounted, ref } from 'vue'
import { useTrashStoreWithOut } from '@/stores/modules/trash'
import * as fileApi from '@/apis/file'
import type { FileInfo } from '@/types/file'
import { vOnClickOutside } from '@vueuse/components'
import TrashFileItem from '@/views/trash/components/TrashFileItem.vue'

const trashStore = useTrashStoreWithOut()
const trashFiles = ref<FileInfo[]>([])
const ignoreRef = ref()

onMounted(async () => {
  await fileApi.getFiles({
    isTrash: true
  }).then((response) => {
    trashFiles.value = response.map(file => {
      return {
        fileId: file.fileId,
        name: file.fileName,
        file: file.fileContent
      }
    })
  })
})

// Methods
const onClickOutsideHandler = [
  () => {
    trashStore.clearActivatedTrashFiles()
  },
  { ignore: [ignoreRef] }
]
</script>

<style scoped>

</style>
