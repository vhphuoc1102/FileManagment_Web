<template>
  <div class="flex flex-col gap-2 pr-4">
    <AlbumBreadCrumb class="ml-4" type="album" />
    <AlbumUtilityBar v-if="isAlbumPage" ref="ignoreRef" class="mx-6 mb-4" />
    <UtilityBar v-if="!isAlbumPage" ref="activeItemRef" class="ml-4" />
    <div class="px-[1.125rem]">
      <div>
        <div v-if="isAlbumPage" class="flex flex-wrap gap-3 px-3">
          <AlbumItem v-for="(album, index) in albumInfos" :key="index" v-on-click-outside="onClickOutsideHandler"
                     :album-id="album.albumId" :name="album.name" />
        </div>
        <div v-else class="flex flex-wrap gap-3 px-3">
          <FileItem v-for="(fileInfo, index) in fileInfos" :key="index" ref="activeItemRef"
                    :file="fileInfo.file" :file-id="fileInfo.fileId" :name="fileInfo.name"></FileItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlbumBreadCrumb from '@/views/album/components/AlbumBreadCrumb.vue'
import AlbumUtilityBar from '@/views/album/components/AlbumUtilityBar.vue'
import AlbumItem from '@/components/AlbumItem.vue'
import { onMounted, ref } from 'vue'
import type { AlbumInfo } from '@/types/album'
import { useAlbumStore } from '@/stores/modules/album'
import { vOnClickOutside } from '@vueuse/components'
import { useRoute } from 'vue-router'
import * as albumApi from '@/apis/album'
import FileItem from '@/components/FileItem.vue'
import type { FileInfo } from '@/types/file'
import { useFileStore } from '@/stores/modules/file'
import UtilityBar from '@/components/UtilityBar.vue'
import * as fileApi from '@/apis/file'

// Stores
const albumStore = useAlbumStore()
const route = useRoute()
const fileStore = useFileStore()
// Constants
const { path } = route

// Variables
const albumInfos = ref<AlbumInfo[]>([])
const ignoreRef = ref()
const isAlbumPage = ref<boolean>(path === '/album' || (path.startsWith('/album') && !path.includes('file'))) // Album page or album file page
const fileInfos = ref<FileInfo[]>([])
// Event
onMounted(async () => {
  if (isAlbumPage.value) {
    albumStore.setAlbumId(undefined)
    albumStore.clearBreadcrumbs()
    const result = await albumApi.getAlbums({
      page: 1,
      unlimited: true
    })

    if (result) {
      albumInfos.value = Object.values(result.albums).map(album => {
        return {
          albumId: album.albumId,
          name: album.albumName,
          description: album.description
        }
      })
      albumStore.setAlbums(result)
    }
  } else {
    fileInfos.value = (await fileApi.getFiles({
      albumId: albumStore.getAlbumId
    })).map(file => {
      return {
        fileId: file.fileId,
        name: file.fileName,
        file: file.fileContent
      }
    })
  }

})

// Methods
const onClickOutsideHandler = [
  () => {
    fileStore.clearActivatedFiles()
  },
  { ignore: [ignoreRef] }
]
</script>

<style scoped>

</style>
