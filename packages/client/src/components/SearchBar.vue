<script setup>
import { SearchOutline } from '@vicons/ionicons5'

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="search-bar">
    <n-input v-bind="$attrs" type="text" placeholder="搜索" clearable class="search-bar-input">
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
  margin-bottom: 0!important;
  flex: 1;
}
</style>
