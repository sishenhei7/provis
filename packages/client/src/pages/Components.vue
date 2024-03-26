<script setup>
import { ref, watch } from 'vue'
import { ListCircleOutline, LogoTableau, NavigateCircleOutline } from '@vicons/ionicons5'
import SearchBar from '../components/SearchBar.vue'
import VisGraph from '../components/VisGraph.vue'
import VisList from '../components/VisList.vue'
import { visData, visGraphData } from './mock'

// todo: ts types
const type = ref('list')
function toggleType() {
  type.value = type.value === 'list' ? 'graph' : 'list'
}

const searchString = ref('')
watch(searchString, (newVal) => {
  // eslint-disable-next-line no-console
  console.log(newVal)
})
function handleSelect(str) {
  searchString.value = str
  type.value = 'graph'
}
function handleClear() {
  searchString.value = ''
  type.value = 'list'
}

const rootName = ref(null)
const isRootMode = ref(false)
function checkRoot() {
  isRootMode.value = !isRootMode.value
}
function closeRoot() {
  rootName.value = null
  isRootMode.value = false
}
</script>

<template>
  <SearchBar v-model:value="searchString" style="margin-bottom: 6px;" @clear="handleClear()">
    <n-tag v-if="rootName" closable type="info" style="margin-left: 16px;" @close="closeRoot()">
      终点：{{ rootName.name }}
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
          <NavigateCircleOutline />
        </n-icon>
      </template>
    </n-button>
  </SearchBar>
  <VisList v-if="type === 'list'" :vis-data="visGraphData" :search-string="searchString" @select="handleSelect" />
  <VisGraph v-else-if="type === 'graph'" :vis-data="visData" />
</template>
