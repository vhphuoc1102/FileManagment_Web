<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
          :header="header"
          :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }"
          modal>
    <div class="flex flex-col w-96 gap-5">
      <IftaLabel>
        <label class="font-semibold" for="name">Name</label>
        <InputText id="name" autocomplete="off" class="flex-auto w-full" />
      </IftaLabel>
      <IftaLabel>
        <label class="font-semibold" for="description">Description</label>
        <Textarea id="description" class="w-full" cols="30" rows="3" style="resize:none" />
      </IftaLabel>
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
