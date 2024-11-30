<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false" :header="header"
          modal>
    <div class="flex items-center gap-4 mb-4">
      <label class="font-semibold w-24" for="name">Name</label>
      <InputText id="name" autocomplete="off" class="flex-auto" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label class="font-semibold w-24" for="description">Description</label>
      <Textarea id="description" cols="30" rows="5" style="resize:none" />
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="secondary" type="button" @click="close" />
      <Button label="Save" type="button" @click="onSave" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { AlbumInfo } from '@/types/album'
import { computed } from 'vue'

const HEADER = {
  CREATE: 'New Album',
  UPDATE: 'Update Album'
}
const visible = defineModel<boolean | undefined>()
const props = defineProps({
  albumInfo: {
    type: Object as () => AlbumInfo,
    require: false
  }
})
const header = computed(() => {
  if (!props.albumInfo) {
    return HEADER.CREATE
  } else {
    return HEADER.UPDATE
  }
})
const close = () => {
  visible.value = false
}
const onSave = () => {
  // TODO: Call API
  close()
}
</script>

<style scoped>

</style>
