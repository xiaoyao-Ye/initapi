#!/usr/bin/env node
import { useInquirer } from "./utils/inquirer"
import { program } from 'commander'
import { checkUpdate, pkgVersion } from './utils/checkUpdate'
import { main } from "./main";


program.name('initapi').version(pkgVersion, '-V, --version')

program.usage('<command> [options]');

program
  .command('update')
  .description('update the cli to latest version')
  .action(async () => await checkUpdate())

program
  .command('create')
  .description('创建api')
  .action(async () => {
    // 命令行交互
    const { url, fileType } = await useInquirer();
    main(url, fileType);
  })

program.parse(process.argv)

