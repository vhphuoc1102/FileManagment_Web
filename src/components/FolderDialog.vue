<template>
  <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
          :header="header" :pt="{
            content: {
              class: 'flex flex-col gap-5'
            }
          }" modal>
    <IftaLabel>
      <label class="font-semibold" for="folder">Folder name</label>
      <InputText id="folder" v-model="name" autocomplete="off" class="flex-auto w-96" />
    </IftaLabel>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="secondary" type="button" @click="close"></Button>
      <Button label="Save" type="button" @click="onSave"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { FolderInfo } from '@/types/file'
import { computed, onMounted, ref, unref } from 'vue'
import * as directoryApi from '@/apis/directory'
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const folderStore = useFolderStoreWithOut()
const { loadStart, loadDone } = usePageLoading()

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

const name = ref<string>('')
const visible = defineModel<boolean | undefined>()
const header = computed(() => {
  if (!props.folderInfo || props.folderInfo.directoryId == -1) {
    return HEADER.CREATE
  } else {
    return HEADER.UPDATE
  }
})

onMounted(() => {
  if (props.folderInfo) {
    name.value = props.folderInfo.name
  }
})

const close = () => {
  visible.value = false
}
const onSave = async () => {
  try {
    loadStart()
    let result
    if (!props.folderInfo || props.folderInfo.directoryId == -1) {
      result = await directoryApi.addDirectory({
        name: unref(name),
        parentDirectoryId: folderStore.getParentDirectoryId
      })
    } else {
      result = await directoryApi.updateDirectory(props.folderInfo.directoryId, unref(name))
    }
    if (result) {
      close()
    }
  } finally {
    loadDone()
  }
}
</script>

<style scoped>

</style>
