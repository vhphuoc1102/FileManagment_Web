<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="true"
          :dismissableMask="true"
          :draggable="false" :pt="{
            content: {
              class: 'flex gap-3 w-[44rem]'
            }
          }" header="Share image" modal>
    <InputText v-model="shareLink" class="w-full" disabled placeholder="Disabled" />
    <Button :loading="loading" :pt="{
      root: {
        class: 'px-6'
      },
      loadingIcon: {
        class: 'w-8 h-8'
      }
    }" icon="pi pi-clone" label="Copy" type="button" @click="copyLink" />
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'

const shareLink = ref<string>('')
const { copy } = useClipboard()
const visible = defineModel<boolean>()

const props = defineProps({
  shareCode: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  shareLink.value = `${window.location.origin}/image/${props.shareCode}`
})
watch(() => props.shareCode, (newShareCode) => {
  shareLink.value = `${window.location.origin}/image/${newShareCode}`
})

const loading = ref<boolean>(false)

const load = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const copyLink = () => {
  copy(shareLink.value)
  load()
}
</script>
