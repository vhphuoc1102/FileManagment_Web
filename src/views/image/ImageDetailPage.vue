<template>
  <div class="max-w-4xl mx-auto p-4 bg-white shadow-xl rounded-lg mt-10 mb-10">
    <div class="flex w-full">
      <div class="w-3/5 flex justify-center items-center">
        <Image :src="image" alt="Image"
               imageClass="h-[30rem] w-full object-contain rounded-lg border border-gray-300 p-2" preview />
      </div>
      <div class="w-2/5 pl-4 flex flex-col gap-5">
        <div class="flex gap-3">
          <Button unstyled>
            <Avatar class="mr-2 cursor-pointer" icon="pi pi-user" shape="circle" size="large" />
          </Button>
          <span>{{ fileDetail?.authorName }}</span>
        </div>
        <div class="flex gap-3">
          <Button icon="pi pi-download" rounded severity="secondary" variant="text" @click="download" />
          <Button icon="pi pi-info-circle" rounded severity="secondary" variant="text" @click="showInfo" />
        </div>
      </div>
    </div>
  </div>
  <InfoDrawer v-if="infoVisible" v-model="infoVisible" :author-id="fileDetail?.authorId"
              :file-id="fileDetail?.file.fileId"
              :visible="infoVisible" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import * as fileApi from '@/apis/file'
import type { GetFileDetailResponse } from '@/apis/file/response'
import * as toast from '@/composables/toast'
import { useUserStoreWithOut } from '@/stores/modules/user'
import InfoDrawer from '@/components/InfoDrawer.vue'

const route = useRoute()
const userStore = useUserStoreWithOut()
const fileDetail = ref<GetFileDetailResponse>()
const infoVisible = ref<boolean>()
const image = computed(() => `data:image/jpeg;base64,${fileDetail.value?.file.fileContent}`)

onMounted(async () => {
  const shareCode = route.params.id as string
  const fileId = Number(route.query.fileId as string)
  const isPublic = !userStore.getUserInfo || !userStore.getToken

  if (isPublic) {
    await fileApi.getFileDetailPublicShare({
      shareCode: shareCode,
      fileId: -1
    }).then(res => {
      fileDetail.value = res
    }).catch(err => {
      toast.error('Failed to get file detail', '')
      console.error(err)
    })
  } else if (!fileId) {
    await fileApi.getFileDetailShare({
      shareCode: shareCode
    }).then(res => {
      fileDetail.value = res
    }).catch(err => {
      toast.error('Failed to get file detail', '')
      console.error(err)
    })
  } else {
    await fileApi.getFileDetailShare({
      fileId: fileId
    }).then(res => {
      fileDetail.value = res
    }).catch(err => {
      toast.error('Failed to get file detail', '')
      console.error(err)
    })
  }
})

const download = async () => {
  if (fileDetail.value?.file.fileId) {
    const isPublic = !userStore.getUserInfo || !userStore.getToken
    if (!isPublic) {
      try {
        await fileApi.downloadFile({
          authorId: fileDetail.value?.authorId,
          fileIds: [fileDetail.value?.file.fileId],
          storageFileType: 0
        }).then(response => {
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
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        await fileApi.downloadFilePublic({
          authorId: fileDetail.value?.authorId,
          fileIds: [fileDetail.value?.file.fileId],
          storageFileType: 0
        }).then(response => {
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
      } catch (error) {
        console.error(error)
      }
    }
  }
}

const showInfo = async () => {
  infoVisible.value = true

}

</script>

<style scoped>

</style>
