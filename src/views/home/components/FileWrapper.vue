<template>
  <div class="cursor-pointer">
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
      <Image alt="Image" imageClass="h-40" preview src="/test.jpg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FileInfoWithStatus, FileTimeGroupInfo } from '@/stores/modules/home'
import { watch } from 'vue'

const fileInfo = defineModel<FileInfoWithStatus>('file', { required: true })
const fileGroup = defineModel<FileTimeGroupInfo>('fileGroup', { required: true })

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
</script>

<style scoped>

</style>
