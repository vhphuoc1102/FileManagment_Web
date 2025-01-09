<template>
  <a ref="target"
     :class="['flex flex-col items-center w-36 cursor-pointer h-fit pt-6 relative',
    activated || mouseOver ? 'border-2 rounded-md bg-[var(--p-surface-200)] border-[var(--p-primary-500)]' : '']"
     @contextmenu="onRightClick"
     @dblclick="onDbClick"
     @mouseleave="mouseOver = false"
     @mouseover="mouseOver = true"
     @click.exact="onClick"
     @click.ctrl="onCtrlClick"
  >
    <span class="material-icons text-8xl text-[var(--p-primary-500)]">photo_library</span>
    <div class="max-w-full p-1">
      <p class="break-words">{{ props.name }}</p>
    </div>
    <div class="flex items-center absolute top-0 right-0">
      <Button :pt="{
          icon: {
            class: 'text-sm'
          }
                }" aria-controls="overlay_menu" aria-haspopup="true"
              icon="pi pi-ellipsis-v" rounded variant="text" @click="toggleFolderOp" />
      <Menu id="overlay_menu" ref="folderOp" :model="menuItems" :popup="true" :pt=" {
            submenuLabel:  {
              class: 'py-0'
            }
          }" />
    </div>
  </a>
  <AlbumDialog v-model="showAlbumDialog" :album-info="props" />
  <ContextMenu ref="contextMenu" :model="menuItems" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAlbumStoreWithOut } from '@/stores/modules/album'
import type { AlbumInfo } from '@/types/album'
import { useRouter } from 'vue-router'
import AlbumDialog from '@/components/AlbumDialog.vue'

// Stores
const albumStore = useAlbumStoreWithOut()
const router = useRouter()

// Props
const props = withDefaults(defineProps<AlbumInfo>(), {
  name: '',
  albumId: -1,
  description: ''
})

// Variables
const showAlbumDialog = ref<boolean>(false)
const target = ref()
const mouseOver = ref(false)
const activated = computed(() => {
  return albumStore.getActivatedAlbums.includes(props.albumId)
})
const folderOp = ref()
const menuItems = [
  {
    label: 'Info',
    icon: 'pi pi-info-circle'
  },
  {
    label: 'Download',
    icon: 'pi pi-download'
  },
  {
    label: 'Rename',
    icon: 'pi pi-download',
    command: () => {
      showAlbumDialog.value = true
    }
  },
  {
    label: 'Share',
    icon: 'pi pi-user-plus'
  },
  {
    label: 'Add to album',
    icon: 'pi pi-images'
  },
  {
    label: 'Move to trash',
    icon: 'pi pi-trash'
  }
]
const contextMenu = ref()

// Methods
const onClick = () => {
  albumStore.clearActivatedAlbums()
  albumStore.addActivatedAlbum(props.albumId)
}

const onDbClick = async () => {
  onClick()
  albumStore.addBreadcrumb(props)
  albumStore.setAlbumId(props.albumId)
  await router.push({
    path: 'album', query: {
      albumId: props.albumId
    }
  })
}

const onCtrlClick = () => {
  if (activated.value) {
    albumStore.removeActivatedAlbum(props.albumId)
  } else {
    albumStore.addActivatedAlbum(props.albumId)
  }
}

const toggleFolderOp = (event: MouseEvent) => {
  folderOp.value.toggle(event)
}

const onRightClick = (event: MouseEvent) => {
  contextMenu.value.show(event)
}
</script>

<style scoped>

</style>
