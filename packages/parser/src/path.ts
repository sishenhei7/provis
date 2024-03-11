import { dirname, join, resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import debug from 'debug'
import type { ImportChainOptions } from './index'

const debugPath = debug('import-chain:path')

type Tsconfig = Record<string, any>
let tsconfig: Tsconfig | null
const modulePathSet = new Set<string>() // 模块名是解析不了的，储存它们

function ensureFileExist(filePath: string, extensions: string[]): string {
  if (existsSync(filePath))
    return filePath

  for (const extension of extensions || []) {
    const pathWithExtension = `${filePath}${extension}`
    if (existsSync(pathWithExtension))
      return pathWithExtension
  }

  return ''
}

function getTsconfig(customConfig = ''): Tsconfig | null {
  if (tsconfig || tsconfig === null)
    return tsconfig

  const tsconfigPath = [
    resolve('tsconfig.json'),
    resolve('tsconfig.build.json'),
    ...(customConfig ? [resolve(customConfig)] : []),
  ]
  for (const path of tsconfigPath) {
    if (existsSync(path)) {
      tsconfig = JSON.parse(readFileSync(path, 'utf-8'))
      debugPath(`使用 tsconfig 文件：${path}`)
      return tsconfig
    }
  }

  debugPath('没有找到 tsconfig 文件')
  tsconfig = null
  return tsconfig
}

export default function normalizePath(
  childPath: string,
  parentPath = '',
  options: ImportChainOptions,
): string {
  if (modulePathSet.has(childPath))
    return ''

  const { extensions = [], tsconfigPath } = options
  if (childPath.startsWith('./') || childPath.startsWith('../'))
    return ensureFileExist(resolve(dirname(parentPath), childPath), extensions)

  const tsconfig = getTsconfig(tsconfigPath)?.compilerOptions ?? {}
  for (const item of [tsconfig, options]) {
    const { baseUrl, paths } = item
    if (baseUrl && paths) {
      for (const key in paths) {
        if (key.endsWith('*') && childPath.startsWith(key.slice(0, -1))) {
          for (const pathItem of paths[key]) {
            const mappedPath = pathItem.slice(0, -1)
            const mappedDir = resolve(baseUrl, mappedPath)
            const potential = join(mappedDir, childPath.substring(key.slice(0, -1).length))
            const potentialPath = ensureFileExist(potential, extensions)
            if (potentialPath)
              return potentialPath
          }
        }
      }
    }
  }

  const res = ensureFileExist(resolve(childPath), extensions)
  if (res === '')
    modulePathSet.add(res)

  return res
}
