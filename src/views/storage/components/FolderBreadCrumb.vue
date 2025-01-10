<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="onClickHome">
          <span class="material-icons">{{ item.icon }}</span>
          <span v-if="items.length === 0" class="material-icons font-bold text-[--p-surface-500]">
        chevron_right
      </span>
        </a>
      </router-link>
      <a v-else-if="!item.route" :target="item.target" href="/storage"
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
import { useFolderStoreWithOut } from '@/stores/modules/folder'
import type { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'

// Stores
const folderStore = useFolderStoreWithOut()
const router = useRouter()

// Variables
const home = ref({
  icon: 'home',
  route: '/storage'
})
const items = computed(() => folderStore.getBreadcrumbs)

// Methods

const onClickBreadCrumb = (item: MenuItem) => {
  const index = folderStore.getBreadcrumbs.findIndex((breadcrumb) => breadcrumb.directoryId === item.directoryId)
  folderStore.setBreadcrumbs(folderStore.getBreadcrumbs.slice(0, index + 1))
}

const onClickHome = () => {
  folderStore.setBreadcrumbs([])
  folderStore.setRoot()
  router.push('/storage')
}
</script>

<style scoped>

</style>
