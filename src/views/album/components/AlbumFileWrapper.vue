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
import type { AlbumFileWithStatus } from '@/stores/modules/album'

const fileInfo = defineModel<AlbumFileWithStatus>('file', { required: true })

</script>

<style scoped>

</style>
