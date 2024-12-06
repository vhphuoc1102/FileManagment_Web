<template>
  <ScrollPanel class="w-full">
    <div class="flex flex-col gap-2 pr-4">
      <FolderBreadCrumb class="ml-4" />
      <UtilityBar ref="ignoreRef" class="ml-4" />
      <Accordion value="0">
        <AccordionPanel v-if="folderInfos.length > 0" class="border-0" value="0">
          <AccordionHeader class="text-[--p-surface-500] font-semibold w-fit ml-4 flex gap-3 !py-2">Folders
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-wrap gap-3 px-3">
              <FolderItem v-for="(folder, index) in folderInfos" :key="index" v-on-click-outside="onClickOutsideHandler"
                          :directory-id="folder.directoryId" :name="folder.name" />
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel v-if="fileInfos.length > 0" class="border-0" value="1">
          <AccordionHeader class="text-[--p-surface-500] font-semibold w-fit ml-4 flex gap-3 !py-2">Files
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-wrap gap-3 px-3">
              <FolderItem v-for="(folder, index) in folderInfos" :key="index" ref="activeItemRef"
                          :directory-id="folder.directoryId" :name="folder.name" />
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
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import { useFileStoreWithOut } from '@/stores/modules/file'
import UtilityBar from '@/components/UtilityBar.vue'
import { vOnClickOutside } from '@vueuse/components'
import { useRoute } from 'vue-router'

// Stores
const {loadStart, loadDone} = usePageLoading()
const folderStore = useFolderStoreWithOut()
const fileStore = useFileStoreWithOut()

// Variables
const folderInfos = ref<FolderInfo[]>([])
const fileInfos = ref<FileInfo[]>([])
const activeItemRef = ref(null)
const ignoreRef = ref()
const { params } = useRoute()

// Event
onMounted(() => {
  loadStart()
  folderInfos.value = [
    {
      name: '1',
      directoryId: 1
    },
    {
      name: '2',
      directoryId: 2
    }
  ]
  loadDone()
})

// Methods
const onClickOutsideHandler = [
  () => {
    folderStore.clearActivatedFolders()
    fileStore.clearActivatedFiles()
  },
  { ignore: [ignoreRef] }
]
</script>

<style scoped>

</style>
