<template>
  <div class="card flex justify-center gap-4">
    <InputText v-model="shareLink" disabled placeholder="Disabled" />
    <Button icon="pi pi-clone" label="Copy" @click="copy(shareLink)" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const shareLink = ref<string>('')
const { copy } = useClipboard()
const props = defineProps({
  visible: Boolean,
  shareCode: String
})

onMounted(() => {
  shareLink.value = `${window.location.origin}/image/${props.shareCode}`
})
</script>
