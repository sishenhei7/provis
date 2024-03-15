import process from 'node:process'
import path from 'node:path'
import yargs from 'yargs'
import type { LogLevel, ViteDevServer } from 'vite'
import { getPort } from 'get-port-please'
import { version } from './package.json'
import { build as buildAssets } from './commands/build'
import { createServer } from './commands/server'

const cli = yargs(process.argv.slice(2))
  .scriptName('slidev')
  .usage('$0 [args]')
  .version(version)
  .strict()
  .showHelpOnFail(false)
  .alias('h', 'help')
  .alias('v', 'version')

cli.command(
  '* [entry]',
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
      default: 'warn',
      type: 'string',
      choices: ['error', 'warn', 'info', 'silent'],
      describe: 'log level',
    })
    .strict()
    .help(),
  async ({ entry, port: userPort, force, log }) => {
    let server: ViteDevServer | undefined
    let port = 3030

    async function build() {
      const options = { entry }

      await buildAssets(options, {
        root: path.dirname(require.resolve('@provis/client')),
        base: './',
        build: {
          watch: false,
          outDir: './.provis',
        },
      })
    }

    async function initServer() {
      if (server)
        await server.close()

      const options = { entry }
      const host = 'localhost'
      port = userPort || await getPort({
        port: 3030,
        random: false,
        portRange: [3030, 4000],
        host,
      })

      server = (await createServer(
        options,
        {
          server: {
            port,
            strictPort: true,
            open,
            host,
            force,
          },
          optimizeDeps: {
            // Vite 5
            force,
          },
          logLevel: log as LogLevel,
        },
        // {
        //   async loadData() {

        //   },
        // },
      ))
    }

    await build()
    await initServer()
  },
)
