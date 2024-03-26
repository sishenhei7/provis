<script setup>
import { ref, watch } from 'vue'
import { ListCircleOutline, LogoTableau, NavigateCircleOutline } from '@vicons/ionicons5'
import SearchBar from '../components/SearchBar.vue'
import VisGraph from '../components/VisGraph.vue'
import VisList from '../components/VisList.vue'
import { visData } from './mock'

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
  <SearchBar v-model:value="searchString">
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
  <VisList v-if="type === 'list'" />
  <VisGraph v-else-if="type === 'graph'" :vis-data="visData" />
</template>
