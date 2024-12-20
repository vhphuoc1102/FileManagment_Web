<template>
  <Drawer v-model:visible="isVisible" header="Image information" position="right">
    <table>
      <thead>
      <tr>
        <th>Attribute</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in metadata" :key="key">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      </tbody>
    </table>
  </Drawer>
</template>
<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import { getMeta } from '@/apis/file'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  fileId: {
    type: Number,
    required: true
  }
})

const isVisible = defineModel<boolean | undefined>()
const metadata = ref<Record<string, any>>({})
onMounted(async () => {
  const result = await getMeta({
    fileId: props.fileId
  })
  metadata.value = result.metadata
})
</script>
<style scoped>
</style>
