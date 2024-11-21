<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { markRaw, ref, watch } from 'vue'
import PlainLayout from '@/layouts/plain/PlainLayout.vue'

const layout = ref();
const route = useRoute();
watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component = metaLayout && await import(`./layouts/${metaLayout}.vue`)
      layout.value = markRaw(component?.default || PlainLayout)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      layout.value = markRaw(PlainLayout)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <Toast position="top-right" />
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
