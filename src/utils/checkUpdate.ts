import pkg from '../../package.json'
import shell from 'shelljs'
import chalk from 'chalk'
import semver from 'semver'
import inquirer from 'inquirer'
import ora from 'ora'

const updateVersion = (remoteVersionStr: string, pkgName: string) => {
  const spinner = ora(chalk.blackBright('正在更新, 请稍等...'))
  spinner.start()
  const shellScript = shell.exec(`npm i -g install ${pkgName}`)
  if (!shellScript.code) {
    spinner.succeed(chalk.green(`更新成功, 现在你的本地版本是最新版本${remoteVersionStr}`))
    return
  }
  spinner.stop()
  console.log(chalk.red(`无法安装${pkgName}最新版本, 请检查您的网络或vpn`))
}

export const pkgVersion = pkg.version

export const checkUpdate = async () => {
  const localVersion = pkg.version
  const pkgName = pkg.name
  const remoteVersionStr = shell.exec(`npm view ${pkgName} version`, { silent: true }).stdout

  if (!remoteVersionStr) {
    console.log(chalk.red(`无法获取${pkgName}版本, 请检查网络!`))
    process.exit(1)
  }

  const remoteVersion = semver.clean(remoteVersionStr, undefined)

  if (remoteVersion !== localVersion) {
    console.log(`最新版本是 ${chalk.greenBright(remoteVersion)}, 本地版本是 ${chalk.blackBright(localVersion)} \n\r`)
    const { isUpdate } = await inquirer.prompt([
      {
        name: 'isUpdate',
        type: 'confirm',
        message: '是否更新至最新版本?',
        choices: [
          { name: '更新', value: true },
          { name: '不更新', value: false },
        ],
      },
    ])
    if (isUpdate) {
      updateVersion(remoteVersionStr, pkgName)
    }
  }
  console.info(chalk.green('Great! Your local version is latest!'))
}
