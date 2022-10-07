import { formatEntityEnum, formatApi } from './formatData/index'
import { outputFile } from './outputFile/index'
import { getInitData } from './utils/request'
import { createApiJS, createApiTS, createEntityTS } from './template/index'
import { toLowerCaseFirst } from './utils/index'
import { useInquirer } from './utils/inquirer'
import { getConfig } from './utils/config'

export const main = async () => {
  // 获取配置文件
  const { swagger, importAxios, useAxios, outputDir, outputType } = await getConfig()

  // 命令行交互
  const { url, fileType, serviceName } = await useInquirer(swagger, outputType)

  // 获取 swagger/openapi 的json文件
  const data = await getInitData(url)

  // 生成文件所需的 文件名 文件类型后缀
  const FILE_TYPE: { [prop: string]: string } = { TypeScript: 'ts', JavaScript: 'js' }
  const suffix = FILE_TYPE[fileType]
  const fileName = serviceName ?? toLowerCaseFirst(Object.keys(data.paths)[0].split('/')[1])

  // 格式化api信息
  const apiClassInfo = formatApi(data.paths)

  const templateInfo = { importAxios, useAxios }

  // 根据类型创建模板生成对应文件
  if (fileType === 'TypeScript') {
    const { entityInfoList, enumInfoList, entityNameList, enumNameList } = formatEntityEnum(data.components!.schemas!)
    const templateApi = createApiTS(templateInfo, apiClassInfo, [...entityNameList, ...enumNameList])
    const templateEntity = createEntityTS(entityInfoList, enumInfoList)
    outputFile(outputDir, `${fileName}/api.${suffix}`, templateApi)
    outputFile(outputDir, `${fileName}/entity.${suffix}`, templateEntity)
  } else {
    const templateApi = createApiJS(templateInfo, apiClassInfo)
    outputFile(outputDir, `${fileName}/api.${suffix}`, templateApi)
  }
}
