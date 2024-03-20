import process from 'node:process'
import path from 'node:path'
import { createRequire } from 'node:module'
import yargs from 'yargs'
import type { LogLevel } from 'vite'
import { getPort } from 'get-port-please'

// import { fileURLToPath } from 'node:url';
import { createServer } from 'vite'
import { version } from './package.json'

const require = createRequire(import.meta.url)
const clientDir = path.dirname(require.resolve('@provis/client'))
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

const cli = yargs(process.argv.slice(2))
  .scriptName('slidev')
  .usage('$0 [args]')
  .version(version)
  .strict()
  .showHelpOnFail(false)
  .alias('h', 'help')
  .alias('v', 'version')

cli.command(
  '*',
  'Start provis',
  args => args
    .option('port', {
      alias: 'p',
      type: 'number',
      describe: 'port',
    })
    .option('force', {
      alias: 'f',
      default: false,
      type: 'boolean',
      describe: 'force the optimizer to ignore the cache and re-bundle  ',
    })
    .option('log', {
      default: 'info',
      type: 'string',
      choices: ['error', 'warn', 'info', 'silent'],
      describe: 'log level',
    })
    .strict()
    .help(),
  async ({ port: userPort, force, log }) => {
    const host = 'localhost'
    const port = userPort || await getPort({
      port: 3030,
      random: false,
      portRange: [3030, 4000],
      host,
    })
    const server = (await createServer(
      {
        root: clientDir,
        server: {
          port,
          host,
          strictPort: true,
          open: true,
        },
        optimizeDeps: {
          // Vite 5
          force,
        },
        logLevel: log as LogLevel,
      },
    ))

    await server.listen()
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  },
)

cli
  .help()
  .parse()
