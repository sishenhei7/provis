<script setup>
import { ref } from 'vue'
import { ListCircleOutline, LogoTableau, NavigateCircleOutline, MoveOutline } from '@vicons/ionicons5'
import SearchBar from '../components/SearchBar.vue'
import VisGraph from '../components/VisGraph.vue'
import VisList from '../components/VisList.vue'
import { visGraphData } from './mock'

// todo: ts types
const type = ref('list')
function toggleType() {
  type.value = type.value === 'list' ? 'graph' : 'list'
}

const searchString = ref('')
const selected = ref(null)
const selectedRoot = ref(null)
const selectedRootMode = ref(false)
function handleSearch() {
  type.value = 'list'
  resetSelected()
}
function handleSelect(item) {
  selected.value = item
  searchString.value = item.name
  type.value = 'graph'
}
function handleClear() {
  searchString.value = ''
  resetSelected()
}
function resetSelected() {
  type.value = 'list'
  selected.value = null
  selectedRoot.value = null
  selectedRootMode.value = false
}
function handleSelectNode(node) {
  if (selectedRootMode.value)
    selectedRoot.value = node
}
function checkRoot() {
  selectedRootMode.value = !selectedRootMode.value
}
function closeRoot() {
  selectedRoot.value = null
  selectedRootMode.value = false
}
</script>

<template>
  <SearchBar v-model:value="searchString" style="margin-bottom: 6px;" @clear="handleClear()" @input="handleSearch()">
    <n-tag v-if="selectedRoot" closable type="info" style="margin-left: 16px;" @close="closeRoot()">
      终点：{{ selectedRoot.name }}
    </n-tag>
    <n-button quaternary circle type="primary" style="margin-left: 10px;" @click="toggleType()">
      <template #icon>
        <n-icon :size="28">
          <ListCircleOutline v-show="type === 'list'" />
          <LogoTableau v-show="type === 'graph'" />
        </n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="primary" style="margin-left: 6px;" @click="checkRoot()">
      <template #icon>
        <n-icon :size="28">
          <NavigateCircleOutline v-show="!selectedRootMode" />
          <MoveOutline v-show="selectedRootMode" />
        </n-icon>
      </template>
    </n-button>
  </SearchBar>
  <VisList
    v-if="type === 'list'" :vis-data="visGraphData" :search-string="searchString" class="vis-component"
    @select="handleSelect"
  />
  <VisGraph
    v-else-if="type === 'graph'" :vis-data="visGraphData" :selected="selected" :selected-root="selectedRoot"
    class="vis-component" @select-node="handleSelectNode"
  />
</template>

<style scoped>
.vis-component {
  flex: 1;
}
</style>
