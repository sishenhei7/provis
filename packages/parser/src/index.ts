import { performance } from 'node:perf_hooks'
import glob from 'fast-glob'
import debug from 'debug'
import resolveModule from './resolver'
import logger from './logger'

const debugOptions = debug('import-chain:options')
const debugEntry = debug('import-chain:entry')

export interface ImportChainOptions {
  includedPath: string[]
  excludedPath?: string[]
  extensions?: string[]
  baseUrl?: string
  paths?: Record<string, string[]>
  tsconfigPath?: string
}

export interface ImportChainResultItem {
  path: string
  root: string[]
  parents: string[][]
}

const defaultOptions: Partial<ImportChainOptions> = {
  baseUrl: '.',
  extensions: ['.ts', '.vue', '.js', '.jsx', '.tsx', '.d.ts'],
}

export default async function getImportChain(
  filePath: string | string[],
  options: ImportChainOptions,
): Promise<ImportChainResultItem[]> {
  const start = performance.now()
  const result: ImportChainResultItem[] = []
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }

  if (!finalOptions?.includedPath?.length) {
    logger.error('请提供 includedPath 字段！')
    return result
  }

  debugOptions(`入口文件为：${finalOptions}`)

  const entryPathList = await glob(finalOptions.includedPath || [], {
    onlyFiles: true,
    ignore: finalOptions.excludedPath || [],
  })
  for (const entryPath of entryPathList || []) {
    debugEntry(`入口文件为：${entryPath}`)
    resolveModule(entryPath, '', finalOptions)
  }

  const filePathList = Array.isArray(filePath) ? filePath : [filePath]
  for (const filePath of filePathList) {
    const fileItem = resolveModule(filePath, '', finalOptions)
    const parentsPathList = fileItem?.getParentsPath() || []
    result.push({
      path: filePath,
      root: parentsPathList.map(item => item[0]),
      parents: parentsPathList,
    })
  }

  const end = performance.now()
  logger.info(`查找总用时：${Math.floor(end - start) / 1000} s`)
  return result
}
