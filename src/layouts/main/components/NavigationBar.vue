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
