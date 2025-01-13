<template>
  <div class="w-full">
    <div id="map" class="h-[32rem]" />
  </div>
</template>

<script lang="ts" setup>
import type { GetLocationResponse } from '@/apis/location/response'
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const props = defineProps<{
  locations: GetLocationResponse[];
}>()


onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    center: [props.locations[0].longitude, props.locations[0].latitude],
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: 8
  })

// Add markers to the map.
  for (const marker of props.locations) {
    // Create a DOM element for each marker.
    const el = document.createElement('div')
    const width = 40
    const height = 40
    el.className = 'marker'

    el.style.backgroundImage = `url(data:image/png;base64,${marker.fileItem.fileContent})`

    el.style.width = `${width}px`
    el.style.height = `${height}px`
    el.style.backgroundSize = '100%'

    // Add markers to the map.
    new mapboxgl.Marker(el)
      .setLngLat([marker.longitude, marker.latitude])
      .addTo(map)
  }
})

</script>

<style>
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
</style>
