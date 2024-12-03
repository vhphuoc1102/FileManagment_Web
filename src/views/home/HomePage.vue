<template>
  <div class="p-8">
    <HomeUtilityBar class="mb-4" />
    <div class="flex flex-wrap gap-10">
      <div v-for="(group, index) in groups" :key="index">
        <FileTimeGroup v-model="groups[index]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileTimeGroup from '@/views/home/components/FileTimeGroup.vue'
import { useHomeStoreWithOut } from '@/stores/modules/home'
import HomeUtilityBar from '@/views/home/components/HomeUtilityBar.vue'

// Stores
const homeStore = useHomeStoreWithOut()

// Variables
const groups = homeStore.getFileTimeGroups

</script>

<style scoped>

</style>
