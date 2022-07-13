#!/usr/bin/env node
import { formatEntityEnum, formatApi } from "./formatData/index";
import { useInquirer } from "./utils/inquirer"
import { outputFile } from "./outputFile/index";
import { getInitData } from "./utils/request";
import { createApiJS, createApiTS, createEntityTS } from "./template/index";
import { toLowerCaseFirst } from "./utils/index";
import { program } from 'commander'
import { checkUpdate, pkgVersion } from './utils/checkUpdate'

const main = async () => {
  // 命令行交互
  const { url, fileType } = await useInquirer();

  // 获取 swagger/openapi 的json文件
  const data = await getInitData(url);

  // 生成文件所需的 文件名 文件类型后缀
  const FILE_TYPE: { [prop: string]: string } = { TypeScript: 'ts', JavaScript: 'js' }
  const suffix = FILE_TYPE[fileType]
  const fileName = toLowerCaseFirst(Object.keys(data.paths)[0].split('/')[1])

  // 格式化api信息
  const apiClassInfo = formatApi(data.paths);

  // 根据类型创建模板生成对应文件
  if (fileType === 'TypeScript') {
    const { entityInfoList, enumInfoList, entityNameList, enumNameList } = formatEntityEnum(data.components!.schemas!);
    const templateApi = createApiTS(apiClassInfo, [...entityNameList, ...enumNameList]);
    const templateEntity = createEntityTS(entityInfoList, enumInfoList);
    outputFile(`${fileName}/api.${suffix}`, templateApi);
    outputFile(`${fileName}/entity.${suffix}`, templateEntity)
  } else {
    const templateApi = createApiJS(apiClassInfo);
    outputFile(`${fileName}/api.${suffix}`, templateApi)
  }
}


program.name('initapi').version(pkgVersion, '-V, --version')
program.usage('<command> [options]');
program
  .command('update')
  .description('update the cli to latest version')
  .action(async () => await checkUpdate())
program
  .command('create')
  .description('创建api')
  .action(async () => main())
program.parse(process.argv)

