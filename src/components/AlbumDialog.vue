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
        <InputText id="name" v-model="formData.name" autocomplete="off" class="flex-auto w-full" />
      </IftaLabel>
      <IftaLabel>
        <label class="font-semibold" for="description">Description</label>
        <Textarea id="description" v-model="formData.description" class="w-full" cols="30" rows="3"
                  style="resize:none" />
      </IftaLabel>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" severity="danger" type="button" @click="close" />
      <Button :label="actionText" type="button" @click="next" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { AlbumInfo } from '@/types/album'
import { computed, onMounted, ref, unref } from 'vue'
import { updateAlbum } from '@/apis/album'
import * as toast from '@/composables/toast'


onMounted(() => {
  if (props.albumInfo) {
    formData.value = {
      name: props.albumInfo.name,
      description: props.albumInfo.description
    }
  }
})

const formData = ref({
  name: '',
  description: ''
})
const HEADER = {
  CREATE: 'New Album',
  UPDATE: 'Update Album'
}

const visible = defineModel<boolean | undefined>()
const emit = defineEmits(['next-step'])
const props = defineProps({
  albumInfo: {
    type: Object as () => AlbumInfo,
    require: false
  }
})

const actionText = computed(() => {
  if (props.albumInfo) {
    return 'Update'
  } else {
    return 'Next'
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
const next = async () => {
  if (props.albumInfo) {
    const result = await updateAlbum(props.albumInfo.albumId, unref(formData))
    if (result) {
      toast.info('Update album success', '')
      close()
    }
  } else {
    close()
    emit('next-step', unref(formData))
  }
}
</script>

<style scoped>

</style>
