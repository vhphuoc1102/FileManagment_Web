<template>
  <ScrollPanel class="w-full">
    <div class="flex flex-col">
      <FolderBreadCrumb class="ml-4" />
      <div class="flex flex-wrap gap-3 p-3">
        <FolderItem :directory-id="123" name="123" />
        <FolderItem :directory-id="123" name="123" />
      </div>
    </div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import FolderItem from '@/components/FolderItem.vue'
import FolderBreadCrumb from '@/views/storage/components/FolderBreadCrumb.vue'

</script>

<style scoped>

</style>
