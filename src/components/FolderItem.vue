<template>
    <a class="flex flex-col items-center w-32 cursor-pointer h-fit">
      <div>ICON</div>
      <div class="max-w-full p-1">
        <p class="break-words">{{ props.name }}</p>
      </div>
    </a>
</template>

<script setup lang="ts">
import type { FolderInfo } from '@/types/file'
const props = defineProps<FolderInfo>()
</script>

<style scoped>

</style>
