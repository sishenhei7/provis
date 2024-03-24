<script setup>
import { SearchOutline } from '@vicons/ionicons5'
</script>

<template>
  <div class="search-bar">
    <n-button>naive-ui</n-button>
    <n-input placeholder="搜索">
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
    </n-input>
  </div>
</template>

<style scoped>
.search-bar {

}
</style>
