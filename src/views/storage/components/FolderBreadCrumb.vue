<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon, 'text-color text-xl']" />
          <span class="text-primary font-semibold">{{ item.name }}</span>
        </a>
      </router-link>
      <a v-else :href="getBreadcrumbRoute(item.directoryId)" :target="item.target" v-bind="props.action">
        <span class="text-surface-700 dark:text-surface-0">{{ item.name }}</span>
      </a>
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
  icon: 'pi pi-home',
  route: '/storage'
})
const items = computed(() => folderStore.getBreadcrumbs)

// Methods
const getBreadcrumbRoute = (directory: number) => '/storage/' + directory


</script>

<style scoped>

</style>
