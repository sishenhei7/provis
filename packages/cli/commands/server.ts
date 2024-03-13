import { createServer as createViteServer, mergeConfig } from 'vite'

export async function createServer(
  options: Record<string, any>,
  viteConfig: Record<string, any> = {},
  // serverOptions: Record<string, any> = {},
) {
  const server = await createViteServer(
    mergeConfig(
      mergeConfig(options, viteConfig),
      {
        define: {
          // Fixes Vue production mode breaking PDF Export #1245
          __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
        },
      },
    ),
  )

  return server
}
