#!/usr/bin/env node
import process from 'node:process'
import logger from './logger'
import getImportChain from './index'

(async () => {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    logger.error('请输入查找文件夹和文件名！(示例: import-chain \'./pages/**/*.vue\' \'pages/base.ts\')')
  }
  else {
    const infoList = await getImportChain([args.slice(-1)[0]], { includedPath: args.slice(0, -1) })
    logger.log('详细文件路径为：')
    logger.table(
      infoList[0].parents.reduce((accu, curr, index) => {
        if (index > 0)
          accu[`---${index}`] = '----------------------------------'

        for (let i = 0; i < curr.length; i += 1)
          accu[`引用${index}-${i}`] = curr[i]

        return accu
      }, {} as Record<string, string>),
    )
    logger.log('引用的顶层文件为：')
    logger.table(Array.from(new Set(infoList[0].root || [])).map(item => ({ 顶层文件: item })))
  }
})()
