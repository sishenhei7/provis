<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Data, Node, Edge, Options } from 'vis-network'
import { Network } from 'vis-network'
import type { VisGraphItem } from '../type'

const props = defineProps({
  visData: {
    type: Object,
    default: null,
  },
  selected: {
    type: Object,
    default: () => null,
  },
  selectedRoot: {
    type: Object,
    default: () => null,
  },
})
const emit = defineEmits(['selectNode'])
const container = ref<HTMLElement>()

const data = computed<Data>(() => {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const seen = new Set()

  function traverse(data: VisGraphItem, lastId: number | null) {
    if (!data || seen.has(data.id))
      return

    const { id, name, type, parents } = data

    nodes.push({
      id,
      label: name,
      shape: type === 'page' ? 'star' : 'dot',
      color: props.selected.id === data.id ? '#82c742' : undefined,
      // @ts-expect-error additional data
      extra: data,
    })

    if (lastId) {
      edges.push({
        from: lastId,
        to: id,
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
      })
    }

    seen.add(id)
    parents.forEach(item => traverse(item, id))
  }

  traverse(props.selected as VisGraphItem, null)
  return {
    nodes,
    edges,
  }
})

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
      emit('selectNode', node)
  })

  watch(data, () => {
    network.setData(data.value)
  })
})
</script>

<template>
  <div ref="container" class="vis-graph">
    vis-graph
  </div>
</template>

<style scoped>
.vis-graph {
  margin: 0 auto;
  width: 700px;
  min-height: 400px;
  /* border: 1px solid lightgray; */
}
</style>
