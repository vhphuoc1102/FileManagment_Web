<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, watch, markRaw } from 'vue';
import PlainLayout from './layouts/PlainLayout.vue';

const layout = ref();
const route = useRoute();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component = metaLayout && await import(`./layouts/${metaLayout}.vue`)
      layout.value = markRaw(component?.default || PlainLayout)
    } catch (e) {
      layout.value = markRaw(PlainLayout)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
