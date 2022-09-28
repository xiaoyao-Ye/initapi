#!/usr/bin/env node
import { program } from 'commander'
import { checkUpdate, pkgVersion } from './utils/checkUpdate'
import { main } from './main'
export { defineConfig } from './utils/config'

program.name('initapi').version(pkgVersion, '-V, --version')

program.usage('<command> [options]')

program
  .command('update')
  .description('update the cli to latest version')
  .action(async () => await checkUpdate())

program
  .command('create')
  .description('创建api')
  .action(async () => {
    // await new Main().bootstrap()
    main()
  })

program.parse(process.argv)
