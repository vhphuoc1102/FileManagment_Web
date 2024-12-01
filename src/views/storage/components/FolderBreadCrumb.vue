<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span class="material-icons">{{ item.icon }}</span>
          <span v-if="items.length === 0" class="material-icons font-bold text-[--p-surface-500]">
        chevron_right
      </span>
        </a>
      </router-link>
      <a v-else-if="!item.route" :href="getBreadcrumbRoute(item.directoryId)" :target="item.target"
         v-bind="props.action">
        <span class="text-surface-700 dark:text-surface-0">{{ item.name }}</span>
      </a>
    </template>
    <template #separator>
      <span class="material-icons font-bold text-[--p-surface-500]">
        chevron_right
      </span>
    </template>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useFolderStoreWithOut } from '@/stores/modules/folder'

// Stores
const folderStore = useFolderStoreWithOut()

// Variables
const home = ref({
  icon: 'home',
  route: '/storage'
})
const items = computed(() => folderStore.getBreadcrumbs)

// Methods
const getBreadcrumbRoute = (directory: number) => '/storage/' + directory


</script>

<style scoped>

</style>
