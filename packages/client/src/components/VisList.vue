<script setup>
import { computed } from 'vue'

const props = defineProps({
  visData: {
    type: Object,
    default: null,
  },
  searchString: {
    type: String,
    default: '',
  },
})
const visList = computed(() => {
  const list = []
  const pathSet = new Set()

  function traverse(data) {
    if (data) {
      add(data)
      data.parents.forEach(item => traverse(item))
    }
  }

  function add(data) {
    if (!pathSet.has(data.path) && (!props.searchString || data.name.includes(props.searchString))) {
      list.push(data)
      pathSet.add(data.path)
    }
  }

  traverse(props.visData)

  list.sort((a, b) => b.roots.length - a.roots.length)

  return list
})
</script>

<template>
  <div class="vis-list">
    <div v-for="item in visList" :key="item.path" class="vis-list-item" @click="$emit('select', item.name)">
      <div>
        <span>&#60;</span>
        <span class="vis-list-item-name">{{ item.name }}</span>
        <span>/&#62;</span>
      </div>
      <p class="vis-list-item-path">
        {{ item.path }}
      </p>
      <div class="vis-list-item-tags">
        <n-tag type="success" size="small" round>
          引用次数：{{ item.roots.length }}
        </n-tag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vis-list-item {
  margin: 2px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 6px;
  color: #888;
  cursor: pointer;
}
.vis-list-item:hover {
  background-color: rgb(239 211 193);
}
.vis-list-item-name {
  margin: 0 4px;
  color: #000;
}
.vis-list-item-path {
  margin-left: 12px;
}
.vis-list-item-tags {
  margin-left: 12px;
}
</style>
