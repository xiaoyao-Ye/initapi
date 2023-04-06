import { formatEntityEnum, formatApi } from './formatData/index'
import { outputFile } from './outputFile/index'
import { getInitData } from './utils/request'
import { createApiJS, createApiTS, transType } from './template/index'
import { Desc, toLowerCaseFirst } from './utils/index'
import { useInquirer } from './utils/inquirer'
import { getConfig } from './utils/config'
import ejs from 'ejs';
import { resolve } from 'path'

export const main = async () => {
  // 获取配置文件
  const { swagger, importAxios, useAxios, outputDir, outputType, definition, indexable, enumMode } = await getConfig()

  // 命令行交互
  const { url, fileType, serviceName } = await useInquirer(swagger, outputType)

  // 获取 swagger/openapi 的json文件
  const data = await getInitData(url)

  // 生成文件所需的 文件名 文件类型后缀
  const FILE_TYPE = { TypeScript: 'ts', JavaScript: 'js' }
  const suffix = FILE_TYPE[fileType]
  const fileName = serviceName || toLowerCaseFirst(Object.keys(data.paths)[0].split('/')[1])

  // 格式化api信息
  const apiClassInfo = formatApi(data.paths)

  const templateInfo = { importAxios, useAxios }

  // 根据类型创建模板生成对应文件
  if (fileType === 'TypeScript') {
    const indexableTemplate = indexable ? '[key: string]: any' : '';
    const { entityInfoList, enumInfoList, entityNameList, enumNameList } = formatEntityEnum(data.components?.schemas ?? {})
    const { apiList, importEntityName } = createApiTS(templateInfo, apiClassInfo, [...entityNameList, ...enumNameList])
    const templateApi = await ejsRender('./template/typeScript/api.ejs', { apiList, importEntityName, importAxios })
    const templateEntity = await ejsRender('./template/typeScript/typings.d.ejs', { definition, enumMode, indexableTemplate, entityInfoList, enumInfoList, Desc, transType})
    outputFile(outputDir, `${fileName}/api.${suffix}`, templateApi)
    outputFile(outputDir, `${fileName}/typings.d.${suffix}`, templateEntity)
  } else {
    const { apiList } = createApiJS(templateInfo, apiClassInfo)
    const templateApi = await ejsRender('./template/javaScript/api.ejs', { apiList, importAxios })
    outputFile(outputDir, `${fileName}/api.${suffix}`, templateApi)
  }
}

export const ejsRender = (template: string, data: any): Promise<string> => {
  template = resolve(__dirname, template);
  return new Promise((resolve, reject) => {
    ejs.renderFile(template, data, (err, str) => {
      if (err) {
        reject(err)
      }
      resolve(str)
    })
  })
}