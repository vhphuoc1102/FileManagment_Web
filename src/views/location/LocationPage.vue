<template>
  <div class="px-10 w-full mt-3">
    <GeoLocator v-if="locations.length > 0" :locations="locations" />
  </div>
</template>

<script lang="ts" setup>
import GeoLocator from '@/components/GeoLocator.vue'
import { onMounted, ref } from 'vue'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import * as locationApi from '@/apis/location'
import type { GetLocationResponse } from '@/apis/location/response'

const { loadStart, loadDone } = usePageLoading()
const locations = ref<GetLocationResponse[]>([])

onMounted(async () => {
  try {
    loadStart()
    await locationApi.getLocations().then((response) => {
      locations.value = response
    })
  } finally {
    loadDone()
  }
})
</script>

<style scoped>

</style>
