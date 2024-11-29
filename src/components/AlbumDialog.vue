<template>
  <Dialog v-model:visible="visible" modal :header="header">
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <InputText id="name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="description" class="font-semibold w-24">Description</label>
      <Textarea id="description" rows="5" cols="30" style="resize:none"/>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="close"/>
      <Button type="button" label="Save" @click="onSave"/>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { AlbumInfo } from '@/types/album'
import { computed } from 'vue'

const HEADER = {
  CREATE: "New Album",
  UPDATE: "Update Album"
}
const visible = defineModel<boolean | undefined>();
const props = defineProps({
  albumInfo: {
    type: Object as () => AlbumInfo,
    require: false
  }
});
const header = computed(() => {
  if (!props.albumInfo) {
    return HEADER.CREATE;
  } else {
    return HEADER.UPDATE;
  }
})
const close = () => {
  visible.value = false;
};
const onSave = () => {
  // TODO: Call API
  close();
}
</script>

<style scoped>

</style>
