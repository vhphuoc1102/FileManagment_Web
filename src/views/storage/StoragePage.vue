<template>
  <ScrollPanel class="w-full">
    <div class="flex flex-col">
      <FolderBreadCrumb class="ml-4" />
      <Accordion value="0">
        <AccordionPanel v-if="folderInfos.length > 0" class="border-0" value="0">
          <AccordionHeader class="text-[--p-surface-500] font-semibold w-fit ml-4 flex gap-3 !py-2">Folders
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-wrap gap-3 px-3">
              <FolderItem v-for="(folder, index) in folderInfos" :key="index" :directory-id="folder.directoryId"
                          :name="folder.name" />
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel v-if="fileInfos.length > 0" class="border-0" value="1">
          <AccordionHeader class="text-[--p-surface-500] font-semibold w-fit ml-4 flex gap-3 !py-2">Files
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-wrap gap-3 px-3">
              <FolderItem v-for="(folder, index) in folderInfos" :key="index" :directory-id="folder.directoryId"
                          :name="folder.name" />
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import FolderItem from '@/components/FolderItem.vue'
import FolderBreadCrumb from '@/views/storage/components/FolderBreadCrumb.vue'
import { onMounted, ref } from 'vue'
import type { FileInfo, FolderInfo } from '@/types/file'
import { usePageLoading } from '@/hooks/web/usePageLoading'

// Stores
const pageLoadingHook = usePageLoading()

// Mount
onMounted(() => {
  pageLoadingHook.loadingStart()
  folderInfos.value = [
    {
      name: '123',
      directoryId: 123
    },
    {
      name: '123',
      directoryId: 123
    }
  ]
  pageLoadingHook.loadingDone()
})

// Variables
const folderInfos = ref<FolderInfo[]>([])
const fileInfos = ref<FileInfo[]>([])
</script>

<style scoped>

</style>
