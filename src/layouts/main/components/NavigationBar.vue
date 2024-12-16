<template>
  <Toolbar :pt="{
    root: {
      class: 'rounded-none border-x-0'
    }
  }">
    <template #start>
      <span v-if="props.layout === 'User'" class="flex items-center gap-1 px-2 justify-center cursor-pointer">
        <span class="text-2xl font-semibold">Image <span class="text-primary">Storage</span></span>
      </span>
      <Button v-else icon="pi pi-bars" @click="toggleVisible" />
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
      <div class="flex items-center gap-2">
        <Button unstyled>
          <Avatar class="mr-2 cursor-pointer" icon="pi pi-user" shape="circle" size="large" @click="toggleAvatar" />
        </Button>
        <Menu id="overlay_menu" ref="avatarMenu" :model="avatarItems" :popup="true" />
      </div>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { useSettingStoreWithOut } from '@/stores/modules/setting'
import { ref } from 'vue'
import type { MenuItemCommandEvent } from 'primevue/menuitem'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const settingStore = useSettingStoreWithOut()
const userStore = useUserStoreWithOut()
const props = defineProps({
  layout: {
    type: String,
    required: false
  }
})

const avatarMenu = ref()
const avatarKeys = {
  USER_PROFILE: 'user',
  SETTING: 'setting',
  LOGOUT: 'logout'
}

const toggleVisible = () => {
  settingStore.toggleSideBarVisible()
}
const toggleAvatar = (event: MouseEvent) => {
  avatarMenu.value.toggle(event)
}
const onClickAvatarItem = (event: MenuItemCommandEvent) => {
  const label = event.item.key
  if (label === avatarKeys.USER_PROFILE) {
  } else if (label === avatarKeys.SETTING) {
  } else if (label === avatarKeys.LOGOUT) {
    confirm.require({
      message: 'Are you sure you want to log out?',
      header: 'Log out',
      icon: 'pi pi-exclamation-circle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Continue',
      rejectClass: 'p-button-danger',
      accept: () => userStore.logout()
    })
  }
}
const avatarItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    key: avatarKeys.USER_PROFILE,
    command: onClickAvatarItem
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    key: avatarKeys.SETTING,
    command: onClickAvatarItem
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    key: avatarKeys.LOGOUT,
    command: onClickAvatarItem
  }
])
</script>

<style scoped>

</style>
