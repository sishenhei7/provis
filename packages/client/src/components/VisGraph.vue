<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Data, Options } from 'vis-network'
import { Network } from 'vis-network'

const props = defineProps({
  visData: Object,
})

const data = computed<Data>(() => props.visData as Data)
const container = ref<HTMLElement>()
const selected = ref<any>()

onMounted(() => {
  const options: Options = {
    nodes: {
      shape: 'dot',
      size: 16,
    },
    physics: {
      repulsion: {
        centralGravity: 0.7,
        springLength: 100,
        springConstant: 0.01,
      },
      maxVelocity: 146,
      solver: 'forceAtlas2Based',
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 200,
      },
    },
    groups: {
      user: {
        color: '#42b883',
      },
      unknown: {
        color: '#b86542',
      },
      lib: {
        color: '#b4b842',
      },
      page: {
        color: '#42b2b8',
      },
      layout: {
        color: '#4256b8',
      },
    },
  }

  const network = new Network(container.value!, data.value, options)

  network.on('click', (e) => {
    const id = e.nodes?.[0]
    const node = (data.value.nodes as any[])?.find(i => i.id === id)?.extra
    if (node)
      selected.value = node
      // console.log(111, node)
  })

  watch(data, () => {
    network.setData(data.value)
  })
})
</script>

<template>
  <div ref="container" class="vis-graph" />
</template>

<style scoped>
.vis-graph {
  width: 600px;
  height: 400px;
  /* border: 1px solid lightgray; */
}
</style>
