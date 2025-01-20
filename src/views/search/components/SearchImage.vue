<template>
  <Image :src="image" alt="Image" imageClass="h-40 cursor-pointer mb-2" @click="onClick" />
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { SearchFileResponse } from '@/apis/search/response'
import router from '@/router'

const props = defineProps({
  image: {
    type: Object as PropType<SearchFileResponse>,
    required: true
  }
})

const image = computed(() =>
  `data:image/jpeg;base64,${props.image?.fileContent}`
)

const onClick = async () => {
  if (props.image?.shareCode) {
    await router.push(`/image/${props.image?.shareCode}`)
  } else if (props.image?.fileId) {
    await router.push(`/image/${props.image?.fileId}?fileId=${props.image?.fileId}`)
  }
}
</script>

<style scoped>

</style>
