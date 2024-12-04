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
      <a v-else-if="!item.route" :href="getBreadcrumbRoute(item.albumId)" :target="item.target"
         v-bind="props.action" @click="onClickBreadCrumb(item)">
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
import { useAlbumStore } from '@/stores/modules/album'
import type { MenuItem } from 'primevue/menuitem'

// Stores
const albumStore = useAlbumStore()

// Variables
const home = ref({
  icon: 'home',
  route: '/album'
})
const items = computed(() => albumStore.getBreadcrumbs)

// Methods
const getBreadcrumbRoute = (albumId: number) => '/album/' + albumId

const onClickBreadCrumb = (item: MenuItem) => {
  const index = albumStore.getBreadcrumbs.findIndex((breadcrumb) => breadcrumb.albumId === item.albumId)
  albumStore.setBreadcrumbs(albumStore.getBreadcrumbs.slice(0, index + 1))
}
</script>

<style scoped>

</style>
