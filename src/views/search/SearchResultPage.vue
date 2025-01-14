<template>
  <div>
    <div v-if="searchStore.getSearchUsers.length > 0" class="flex flex-col gap-5">
      <span class="text-2xl font-semibold">Users</span>
      <div>
        <SearchUser v-for="(user, index) in searchStore.getSearchUsers"
                    :key="index"
                    :user="user" />
      </div>
    </div>
    <div v-if="searchStore.getSearchFiles.length > 0" class="flex flex-col gap-5">
      <span class="text-2xl font-semibold">
        Images
      </span>
      <div>
        <SearchImage v-for="(image, index) in searchStore.getSearchFiles" :key="index" :image="image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchStoreWithOut } from '@/stores/modules/search'
import SearchUser from '@/views/search/components/SearchUser.vue'
import SearchImage from '@/views/search/components/SearchImage.vue'
import { onBeforeRouteLeave } from 'vue-router'

const searchStore = useSearchStoreWithOut()

onBeforeRouteLeave((to, from, next) => {
  searchStore.clearKeyword()
  next()
})
</script>

<style scoped>

</style>
