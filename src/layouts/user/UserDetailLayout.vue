<template>
  <div class="flex flex-col items-center">
    <div>
      <div class="relative">
        <img alt="wallpaper" class="w-[60rem] h-[20rem]" src="/wallpaper.jpg">
        <div
          class="w-32 h-32 rounded-full overflow-hidden absolute bottom-0 left-24 transform -translate-x-1/2 translate-y-1/2 border-4 border-white">
          <img alt="avatar" class="w-full h-full object-cover"
               src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png">
        </div>
      </div>
      <Menubar :model="menubarItems" class="pt-16">
        <template #item="{ item, props, hasSubmenu, root }">
          <a v-ripple :href="item.route" class="flex items-center" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut"
                  class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
              }}</span>
            <i v-if="hasSubmenu"
               :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
          </a>
        </template>
        <template #end>
          <div class="flex items-center">
            <Button aria-controls="overlay_menu" aria-haspopup="true" class="px-4 py-2 ml-3 mb-3" icon="pi pi-plus"
                    label="New"
                    raised variant="outlined" @click="toggleNew" />
            <Menu id="overlay_menu" ref="newOp" :model="newPopoverItems" :popup="true" :pt=" {
            submenuLabel:  {
              class: 'py-0'
            }
          }" />
          </div>
        </template>
      </Menubar>
    </div>
    <router-view class="px-16" />
    <FolderDialog v-model="showFolderDialog" />
    <AlbumDialog v-model="showAlbumDialog" @next-step="nextStepCreateAlbum" />
    <AlbumFileDialog v-model="showAlbumFileDialog"
                     :creating-album-info="creatingAlbumInfo" @back="showAlbumDialog = true" />
    <UploadFileDialog v-model="showFileDialog" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { MenuItemCommandEvent } from 'primevue/menuitem'
import type { AlbumGeneralInfo } from '@/types/album'
import FolderDialog from '@/components/FolderDialog.vue'
import AlbumDialog from '@/components/AlbumDialog.vue'
import AlbumFileDialog from '@/components/AlbumFileDialog.vue'
import UploadFileDialog from '@/components/UploadFileDialog.vue'

const showFolderDialog = ref<boolean>()
const showFileDialog = ref<boolean>()
const showAlbumDialog = ref<boolean>()
const showAlbumFileDialog = ref<boolean>()
const creatingAlbumInfo = ref<AlbumGeneralInfo>()
const menubarItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/home',
    block: false
  },
  {
    label: 'My Storage',
    icon: 'pi pi-folder',
    route: '/storage',
    block: false
  },
  {
    label: 'Album',
    icon: 'pi pi-images',
    route: '/album',
    block: false
  },
  {
    label: 'Locations',
    icon: 'pi pi-map-marker',
    route: '/location',
    block: false
  }
  ,
  {
    label: 'Trash',
    icon: 'pi pi-trash',
    route: '/trash',
    block: false
  }
])
const POPOVER = {
  FILE: 'file',
  FOLDER: 'folder',
  ALBUM: 'album'
}

const onClickItem = (event: MenuItemCommandEvent) => {
  const key = event.item.key
  if (key === POPOVER.FILE) {
    showFileDialog.value = true
  } else if (key === POPOVER.FOLDER) {
    showFolderDialog.value = true
  } else if (key === POPOVER.ALBUM) {
    showAlbumDialog.value = true
  }
}
const newPopoverItems = ref([
  {
    items: [
      {
        label: 'Upload File',
        icon: 'pi pi-file-arrow-up',
        key: POPOVER.FILE,
        command: onClickItem
      },
      {
        label: 'New Folder',
        icon: 'pi pi-folder-plus',
        key: POPOVER.FOLDER,
        command: onClickItem
      },
      {
        label: 'New Album',
        icon: 'pi pi-images',
        key: POPOVER.ALBUM,
        command: onClickItem
      }
    ]
  }
])
const newOp = ref()
const toggleNew = (event: MouseEvent) => {
  newOp.value.toggle(event)
}
const nextStepCreateAlbum = (albumInfo: AlbumGeneralInfo) => {
  console.log(albumInfo)
  creatingAlbumInfo.value = albumInfo
  showAlbumFileDialog.value = true
}
</script>

<style scoped>

</style>
