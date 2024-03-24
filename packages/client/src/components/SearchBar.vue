<script setup>
import { SearchOutline } from '@vicons/ionicons5'

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="search-bar">
    <n-input v-bind="$attrs" type="text" placeholder="搜索">
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
    </n-input>
    <div class="search-bar-btns">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar-btns {
  margin-left: 4px;
}
</style>
