<template>
  <div>
    <Drawer @show="toggleVisible" @hide="toggleVisible" v-model:visible="visible">
      TEST
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { useSettingStoreWithOut } from '@/stores/modules/setting'
import { computed } from 'vue'

const settingStore = useSettingStoreWithOut();
const visible = computed(() => settingStore.getNavBarVisible);
const toggleVisible = () => {
  settingStore.toggleNavBarVisible();
}
</script>

<style scoped>

</style>
