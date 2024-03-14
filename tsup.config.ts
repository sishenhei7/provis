import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['esm'],
  target: 'node16',
  splitting: true,
  dts: true,
  clean: true,
  shims: false,
  external: [/@provis/],
})
