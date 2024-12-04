<template>
  <div class="flex flex-col gap-2 pr-4">
    <AlbumBreadCrumb class="ml-4" type="album"/>
    <AlbumUtilityBar ref="ignoreRef" class="mx-6 mb-4" />
    <div class="px-[1.125rem]">
      <div class="flex flex-wrap gap-3 px-3">
        <div>
          <AlbumItem v-for="(album, index) in albumInfos" :key="index" v-on-click-outside="onClickOutsideHandler"
                     :album-id="album.albumId" :name="album.name" />
        </div>
        <div>
          <AlbumFileWrapper file=""/>
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
import AlbumFileWrapper from '@/views/album/components/AlbumFileWrapper.vue'
import { useRoute } from 'vue-router'

// Stores
const albumStore = useAlbumStore()

// Variables
const albumInfos = ref<AlbumInfo[]>([])
const ignoreRef = ref()

// Event
onMounted(() => {
  albumInfos.value = [
    {
      name: '1',
      albumId: 1,
      description: '1'
    },
    {
      name: '2',
      albumId: 2,
      description: '2'
    }
  ]
})

// Methods
const onClickOutsideHandler = [
  () => {
    albumStore.clearActivatedAlbums()
  },
  { ignore: [ignoreRef] }
]
</script>

<style scoped>

</style>
