<template>
  <Toolbar :pt="{
    root: {
      class: 'rounded-none border-x-0 border-y-1 bg-gray-100'
    }
  }">
    <template #start>
      <span v-if="props.layout === 'User'" class="flex items-center gap-1 px-2 justify-center cursor-pointer"
            @click="backHome">
        <span class="text-3xl font-bold">PI<span class="text-primary">XL</span></span>
      </span>
      <Button v-else icon="pi pi-bars" @click="toggleVisible" />
    </template>
    <template #center>
      <IconField>
        <InputIcon :pt="{
          root: {
            class: 'cursor-pointer'
          }
        }" class="pi pi-search" @click="search" />
        <InputText v-model="keyword" class="w-96" placeholder="Search" @keydown.enter="search" />
      </IconField>
    </template>
    <template #end>
      <Button class="mr-4" icon="pi pi-upload" label="Upload" />
      <div v-if="isLogin()">
        <Button class="mr-4" label="My hub" @click="onClickHub" />
      </div>
      <div v-if="isLogin()" class="flex items-center gap-2">
        <Button unstyled>
          <Avatar class="mr-2 cursor-pointer" icon="pi pi-user" shape="circle" size="large" @click="toggleAvatar" />
        </Button>
        <Menu id="overlay_menu" ref="avatarMenu" :model="avatarItems" :popup="true" />
      </div>
      <div v-if="!isLogin()">
        <Button icon="pi pi-user" label="Login" @click="onClickLogin" />
      </div>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { useSettingStoreWithOut } from '@/stores/modules/setting'
import { computed, ref, unref } from 'vue'
import type { MenuItemCommandEvent } from 'primevue/menuitem'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'
import * as searchApi from '@/apis/search'
import { useSearchStoreWithOut } from '@/stores/modules/search'

const confirm = useConfirm()
const router = useRouter()
const settingStore = useSettingStoreWithOut()
const userStore = useUserStoreWithOut()
const searchStore = useSearchStoreWithOut()
const keyword = ref(searchStore.getKeyword)

const props = defineProps({
  layout: {
    type: String,
    required: false
  }
})
const isLogin = computed(() => userStore.isAuth)
const avatarMenu = ref()
const avatarKeys = {
  USER_PROFILE: 'user',
  SETTING: 'setting',
  LOGOUT: 'logout'
}

const onClickLogin = () => {
  router.push('/login')
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
    router.push('/user')
  } else if (label === avatarKeys.SETTING) {
    router.push('/setting')
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

const search = async () => {
  if (!unref(keyword)) {
    return
  }

  await searchApi.search({
    keyword: unref(keyword)
  }).then((response) => {
    router.push('/search-result')
    searchStore.setSearchUsers(response.searchUsers)
    searchStore.setSearchFiles(response.searchFiles)
  })
}

const backHome = () => {
  router.push('/')
}

const onClickHub = () => {
  router.push('/home')
}
</script>

<style scoped>

</style>
