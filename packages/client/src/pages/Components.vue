<script setup>
import SearchBar from '../components/SearchBar.vue'

// const search = computed({
//   get() {
//     return route.query.search ?? ''
//   },
//   set(search) {
//     router.replace({ query: { search } })
//   },
// })
</script>

<template>
  <h2>AboutView</h2>
  <SearchBar />
</template>
