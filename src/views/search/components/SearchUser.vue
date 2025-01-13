<template>
  <Card :pt="{
    root: {
      class: 'cursor-pointer'
    }
  }" style="width: 12rem; overflow: hidden">
    <template #header>
      <img alt="avatar" class="w-full h-full"
           src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png">
    </template>
    <template #title>
      <div class="text-center">
        <span class="block mx-auto">{{ props.user.username }}</span>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import type { SearchUserResponse } from '@/apis/search/response'
import type { PropType } from 'vue'

const props = defineProps({
  user: {
    type: Object as PropType<SearchUserResponse>,
    required: true
  }
})
</script>

<style scoped>

</style>
