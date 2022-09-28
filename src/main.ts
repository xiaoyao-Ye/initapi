import { formatEntityEnum, formatApi } from './formatData/index'
import { outputFile } from './outputFile/index'
import { getInitData } from './utils/request'
import { createApiJS, createApiTS, createEntityTS } from './template/index'
import { toLowerCaseFirst } from './utils/index'
import { useInquirer } from './utils/inquirer'
import { getConfig } from './utils/config'

// TODO: 改为通过 class 的方式实现, 甚至可以 new 多个实例进行批量生成?
// 可能存在的问题是, 函数调用嵌套太多, 需要确认是否丢失this指向
// 第二个是, 一个 class 实例中挂载了太多的函数和变量, 性能上可能会有影响?
// export class Main {
//   serviceName: string = ''
//   bootstrap = async () => {
//     console.log(this)

//     // 获取配置文件
//     const { swagger, ...config } = await getConfig()

//     // 命令行交互
//     const { url, fileType, serviceName } = await this.useInquirer(swagger)
//     this.serviceName = serviceName
//     console.log({ config })
//     console.log(url)
//     console.log(fileType)
//     console.log(this.serviceName)
//     // 获取 swagger/openapi 的json文件
//     const data = await this.getInitData(url)
//     console.log('data', data)
//   }

//   useInquirer = useInquirer
//   getInitData = getInitData
// }

export const main = async () => {
  // 获取配置文件
  const { swagger, importAxios, useAxios, ...config } = await getConfig()

  // 命令行交互
  const { url, fileType, serviceName } = await useInquirer(swagger)
  console.log({ config })

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
    outputFile(`${fileName}/api.${suffix}`, templateApi)
    outputFile(`${fileName}/entity.${suffix}`, templateEntity)
  } else {
    const templateApi = createApiJS(templateInfo, apiClassInfo)
    outputFile(`${fileName}/api.${suffix}`, templateApi)
  }
}
