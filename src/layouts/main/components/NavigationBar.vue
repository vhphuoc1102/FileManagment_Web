<template>
  <Toolbar :pt="{
    root: {
      class: 'rounded-none border-x-0'
    }
  }">
    <template #start>
      <Button icon="pi pi-bars" @click="toggleVisible" />
    </template>
    <template #center>
      <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText class="w-96" placeholder="Search" />
      </IconField>
    </template>
    <template #end>
      <div>
        <
        <Avatar class="mr-2" icon="pi pi-user" shape="circle" size="large" />
      </div>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { useSettingStoreWithOut } from '@/stores/modules/setting'

const settingStore = useSettingStoreWithOut()
const toggleVisible = () => {
  settingStore.toggleSideBarVisible()
}
</script>

<style scoped>

</style>
