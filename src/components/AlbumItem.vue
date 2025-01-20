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
  <Drawer
    v-model:visible="infoVisible"
    :pt="{
    root: {
      class: '!w-[30rem] p-6 bg-white shadow-lg rounded-lg'
    }
  }"
    header="Image information"
    position="right"
  >
    <div class="space-y-4">
      <div class="flex items-center">
        <span class="font-semibold text-gray-700">Album name:</span>
        <span class="ml-2 text-gray-600">{{ props.name }}</span>
      </div>
      <div class="flex items-start">
        <span class="font-semibold text-gray-700">Album description:</span>
        <span class="ml-2 text-gray-600">{{ props.description }}</span>
      </div>
    </div>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAlbumStoreWithOut } from '@/stores/modules/album'
import type { AlbumInfo } from '@/types/album'
import { useRouter } from 'vue-router'
import AlbumDialog from '@/components/AlbumDialog.vue'
import * as albumApi from '@/apis/album'
import * as toast from '@/composables/toast'
import * as fileApi from '@/apis/file'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { deleteAlbum } from '@/apis/album'

// Stores
const albumStore = useAlbumStoreWithOut()
const router = useRouter()

// Props
const { loadStart, loadDone } = usePageLoading()
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
    icon: 'pi pi-info-circle',
    command: () => {
      infoVisible.value = true
    }
  },
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: async () => {
      const fileIds = await fetchFiles(props.albumId)
      if (fileIds.length === 0) {
        toast.warn('No files in this album', '')
      } else {
        await fileApi.downloadFile({
          fileIds: fileIds.map(file => file.fileId),
          storageFileType: 0
        })
          .then(response => {
            const contentDisposition = response.headers['content-disposition']
            const fileName = contentDisposition ? contentDisposition.split('filename=')[1].split(';')[0].trim() : 'downloaded_file'

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()

            toast.info('Downloaded successfully', '')
          })
          .catch(error => {
            toast.error('Download failed', '')
            console.error(error)
          })
      }
    }
  },
  {
    label: 'Rename',
    icon: 'pi pi-pencil',
    command: () => {
      showAlbumDialog.value = true
    }
  },
  {
    label: 'Move to trash',
    icon: 'pi pi-trash',
    command: async () => {
      await albumApi.deleteAlbum({
        albumIds: [props.albumId]
      })
        .then(() => {
          toast.success('Delete album success', '')
          window.location.reload()
        })
        .catch(error => {
          toast.error('Delete album failed', '')
          console.error(error)
        })
    }
  }
]
const contextMenu = ref()
const infoVisible = ref()

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

const fetchFiles = async (albumId: number) => {
  try {
    loadStart()
    return (await fileApi.getFiles({
      albumId: albumId
    })).map(file => {
      return {
        fileId: file.fileId
      }
    })
  } catch {
    return []
  } finally {
    loadDone()
  }
}
</script>

<style scoped>

</style>
