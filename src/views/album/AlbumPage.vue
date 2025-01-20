<template>
  <div class="w-full">
    <div class="flex flex-col gap-2 pr-4">
      <AlbumBreadCrumb class="ml-4" type="album" />
      <AlbumUtilityBar v-if="!hasAlbumIdQueryParam" ref="ignoreRef" class="mx-6 mb-4" />
      <UtilityBar v-if="hasAlbumIdQueryParam" ref="activeItemRef" class="ml-4" />
      <div class="px-[1.125rem]">
        <div>
          <div v-if="!hasAlbumIdQueryParam" class="flex flex-wrap gap-3 px-3">
            <AlbumItem v-for="(album, index) in albumInfos" :key="index" v-on-click-outside="onClickOutsideHandler"
                       :album-id="album.albumId" :description="album.description" :name="album.name" />
          </div>
          <div v-else class="flex flex-wrap gap-3 px-3">
            <FileItem v-for="(fileInfo, index) in fileInfos" :key="index" ref="activeItemRef"
                      :album-id="albumStore.getAlbumId" :file="fileInfo.file"
                      :file-id="fileInfo.fileId"
                      :name="fileInfo.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AlbumBreadCrumb from '@/views/album/components/AlbumBreadCrumb.vue'
import AlbumUtilityBar from '@/views/album/components/AlbumUtilityBar.vue'
import AlbumItem from '@/components/AlbumItem.vue'
import { onMounted, ref, watch } from 'vue'
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
import { usePageLoading } from '@/hooks/web/usePageLoading'

// Stores
const albumStore = useAlbumStore()
const fileStore = useFileStore()
const { loadStart, loadDone } = usePageLoading()

// Variables
const albumInfos = ref<AlbumInfo[]>([])
const ignoreRef = ref()
const fileInfos = ref<FileInfo[]>([])
const hasAlbumIdQueryParam = ref<boolean>(true)
const route = useRoute()

// Event

const fetchAlbums = async () => {
  try {
    loadStart()
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
  } finally {
    loadDone()
  }
}

const fetchFiles = async () => {
  try {
    loadStart()
    fileInfos.value = (await fileApi.getFiles({
      albumId: albumStore.getAlbumId
    })).map(file => {
      return {
        fileId: file.fileId,
        name: file.fileName,
        file: file.fileContent
      }
    })
  } finally {
    loadDone()
  }
}

onMounted(async () => {
  hasAlbumIdQueryParam.value = route.query.albumId !== undefined
  if (!hasAlbumIdQueryParam.value) {
    await fetchAlbums()
  } else {
    await fetchFiles()
  }
})

watch(() => route.query.albumId, async (newAlbumId, oldAlbumId) => {
  hasAlbumIdQueryParam.value = newAlbumId !== undefined
  if (!hasAlbumIdQueryParam.value) {
    await fetchAlbums()
  } else {
    await fetchFiles()
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
