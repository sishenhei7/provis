<script setup>
import { ref, watch } from 'vue'
import { ListCircleOutline, LogoTableau } from '@vicons/ionicons5'
import SearchBar from '../components/SearchBar.vue'

// const search = computed({
//   get() {
//     return route.query.search ?? ''
//   },
//   set(search) {
//     router.replace({ query: { search } })
//   },
// })

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
</script>

<template>
  <SearchBar v-model:value="searchString">
    <n-button quaternary circle type="primary" @click="toggleType()">
      <template #icon>
        <n-icon :size="28">
          <ListCircleOutline v-show="type === 'list'" />
          <LogoTableau v-show="type === 'graph'" />
        </n-icon>
      </template>
    </n-button>
  </SearchBar>
</template>
