import ts from 'typescript'
import debug from 'debug'
import FileItem from './file'
import normalizePath from './path'
import store from './store'
import type { ImportChainOptions } from './index'

const debugResolver = debug('import-chain:resolve')
const debugIgnore = debug('import-chain:ignore')

export function getFileContent(filePath: string): string {
  const content = ts.sys.readFile(filePath) || ''
  // 如果是 vue 文件的话不需要解析 template 和 style
  if (filePath.endsWith('.vue'))
    return content.replace(/<template[\s\S]*<\/template>/, '').replace(/<style[\s\S]*<\/style>/, '')

  return content
}

export default function resolveModule(
  path: string,
  parentPath: string,
  options: ImportChainOptions,
): FileItem | null {
  const filePath = normalizePath(path, parentPath, options)
  if (!filePath) {
    debugIgnore(`文件${path}不存在，已忽略！`)
    return null
  }
  debugResolver(filePath)

  if (store.has(filePath))
    return store.get(filePath)!

  const fileItem = new FileItem(filePath)
  store.set(filePath, fileItem)

  const sourceFile = ts.createSourceFile(filePath, getFileContent(filePath), ts.ScriptTarget.Latest)
  sourceFile.statements.forEach((node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        const childItem = resolveModule(node.moduleSpecifier.text, filePath, options)
        if (childItem)
          fileItem.addImport(childItem)
      }
    }
  })

  return fileItem
}
