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
          <Button icon="pi pi-download" rounded severity="secondary" variant="text" />
          <Button icon="pi pi-info-circle" rounded severity="secondary" variant="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import * as fileApi from '@/apis/file'
import type { GetFileDetailResponse } from '@/apis/file/response'
import * as toast from '@/composables/toast'

const route = useRoute()
const fileDetail = ref<GetFileDetailResponse>()
const image = computed(() => `data:image/jpeg;base64,${fileDetail.value?.file.fileContent}`)

onMounted(async () => {
  const shareCode = route.params.id as string
  await fileApi.getFileDetailShare({
    shareCode: shareCode
  }).then(res => {
    fileDetail.value = res
  }).catch(err => {
    toast.error('Failed to get file detail', '')
    console.error(err)
  })
})

</script>

<style scoped>

</style>
