<template>
  <div class="w-full">
    <div class="p-8">
      <HomeUtilityBar class="mb-4" />
      <div class="flex flex-wrap gap-10">
        <div v-for="(group, index) in groups" :key="index">
          <FileTimeGroup v-model="groups[index]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileTimeGroup from '@/views/home/components/FileTimeGroup.vue'
import { type FileTimeGroupInfo, useHomeStoreWithOut } from '@/stores/modules/home'
import HomeUtilityBar from '@/views/home/components/HomeUtilityBar.vue'
import { computed, onMounted } from 'vue'
import * as fileApi from '@/apis/file'

// Stores
const homeStore = useHomeStoreWithOut()

// Variables
const groups = computed(() => homeStore.getFileTimeGroups)
// Event
onMounted(async () => {
  const result = await fileApi.getFileGroups({
    storageFileKind: 0
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
    homeStore.setFileTimeGroups(fileGroups)
  }
})
</script>

<style scoped>

</style>
