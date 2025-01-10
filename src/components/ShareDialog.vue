<template>
  <div>
    <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
            :pt="{
            content: {
              class: 'flex flex-col gap-5 w-[40rem]'
            }
          }" header="Share image" modal>
      <RadioButtonGroup :modelValue="privacy" class="flex flex-wrap gap-4" name="Share"
                        @update:model-value="clearShareInfo">
        <div class="flex items-center gap-2">
          <RadioButton :value="-1" inputId="notShare" />
          <label for="notShare">Not Share</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton :value="1" inputId="public" />
          <label for="public">Share Public</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton :value="0" inputId="private" />
          <label for="private">Share Private</label>
        </div>
      </RadioButtonGroup>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" type="button" @click="close"></Button>
        <Button label="Save" type="button" @click="onSave"></Button>
      </div>
      <div>

      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { AddShareRequest } from '@/apis/share/request'
import * as shareApi from '@/apis/share'

const visible = defineModel<boolean | undefined>()
const privacy = ref<number>(-1)
const shareInfo = ref<AddShareRequest>()

const props = defineProps({
  resourceId: {
    type: Number,
    required: true
  },
  resourceKind: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  clearShareInfo()
})

const clearShareInfo = () => {
  shareInfo.value = {
    resourceId: props.resourceId,
    resourceKind: props.resourceKind,
    privacy: privacy.value,
    expiredTs: undefined,
    emails: []
  }
}

const onSave = async () => {

}

const close = () => {
  visible.value = false
}
</script>

<style scoped>

</style>
