// import type { InlineConfig, ResolvedConfig } from 'vite'
import { mergeConfig, build as viteBuild } from 'vite'

export async function build(
  options: Record<string, any>,
  viteConfig: Record<string, any> = {},
  // args: Record<string, any>,
) {
  await viteBuild(mergeConfig(options, viteConfig))
}
