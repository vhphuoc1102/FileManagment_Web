<template>
  <div>
    <div class="flex">
      <div>
        <Img>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import {computed} from 'vue'

const route = useRoute()
const shareCode = computed(() => {
  debugger;
  return route.params.id
})
</script>

<style scoped>

</style>
