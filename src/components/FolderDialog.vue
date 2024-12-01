<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
          :header="header" :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }" modal>
    <IftaLabel>
      <label class="font-semibold" for="folder">Folder name</label>
      <InputText id="folder" autocomplete="off" class="flex-auto w-96" />
    </IftaLabel>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="secondary" type="button" @click="close"></Button>
      <Button label="Save" type="button" @click="onSave"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { FolderInfo } from '@/types/file'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  folderInfo: FolderInfo
}>(), {
  folderInfo: () => {
    return {
      name: '',
      directoryId: -1
    }
  }
})

const HEADER = {
  CREATE: 'New Folder',
  UPDATE: 'Update Folder'
}

const visible = defineModel<boolean | undefined>()
const header = computed(() => {
  if (!props.folderInfo || props.folderInfo.directoryId == -1) {
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
