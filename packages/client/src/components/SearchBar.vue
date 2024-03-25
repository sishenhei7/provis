<script setup>
import { SearchOutline } from '@vicons/ionicons5'

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="search-bar">
    <n-input v-bind="$attrs" type="text" placeholder="搜索" class="search-bar-input">
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
    </n-input>
    <slot />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar-input {
  flex: 1;
}
</style>
