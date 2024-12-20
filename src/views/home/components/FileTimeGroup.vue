<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <Checkbox v-model="group.activatedAll" :pt="{
        root: {
          class: 'w-6'
        },
        box: {
          style: 'border-radius: 50%',
          class: 'ml-1 bg-[--p-surface-300]'
        }
      }" binary />
      <span class="text-[--p-surface-500] font-semibold">{{ group.time }}</span>
    </div>
    <div class="flex gap-1">
      <div v-for="(fileInfo, index) in group.files" :key="index">
        <FileWrapper v-model:file="group.files[index]" v-model:file-group="group" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileWrapper from '@/views/home/components/FileWrapper.vue'
import type { FileInfoWithStatus, FileTimeGroupInfo } from '@/stores/modules/home'
import { watch } from 'vue'

const group = defineModel<FileTimeGroupInfo>({ required: true })

watch(() => group.value.activatedAll, (value) => {
  const fileActivities = group.value.files.map(file => file.activated)
  if (!value && fileActivities.includes(false)) {
    value = false
    return
  }
  group.value.files.forEach((file: FileInfoWithStatus) => {
    file.activated = value
  })
})
</script>

<style scoped>

</style>
