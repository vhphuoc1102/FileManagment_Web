<template>
  <Drawer v-model:visible="isVisible" :pt="{
   root : {
     class: '!w-[30rem]'
   }
          }" header="Image information"
          position="right"
  >
    <table class="info-table">
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
import * as fileApi from '@/apis/file'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { getMeta, getMetaPublic } from '@/apis/file'

const userStore = useUserStoreWithOut()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  fileId: {
    type: Number,
    required: false,
    default: -1
  },
  authorId: {
    type: Number,
    required: false
  }
})

const isVisible = defineModel<boolean | undefined>()
const metadata = ref<Record<string, any>>({})
onMounted(async () => {
  const isPublic = !userStore.getUserInfo || !userStore.getToken
  const param = props.authorId ? {
    fileId: props.fileId,
    authorId: props.authorId
  } : {
    fileId: props.fileId
  }
  let result
  if (!isPublic) {
    result = await fileApi.getMeta(param)
  } else {
    result = await fileApi.getMetaPublic(param)
  }
  metadata.value = result?.metadata
})
</script>

<style scoped>
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  font-family: 'Arial', sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.info-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.info-table th,
.info-table td {
  padding: 12px 15px;
}

.info-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.info-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.info-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
