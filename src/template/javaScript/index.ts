import { ApiInfo, Indexable } from '../../type'
import { Desc, getFuncNameByOpenApi, toLowerCaseFirst } from '../../utils'
import { apiTemplateClass, apiTemplateStatic } from './api'

export const createApiJS = (templateInfo: any, obj: { [className: string]: ApiInfo[] }) => {
  const { importAxios, useAxios } = templateInfo

  let template = importAxios
  for (const className in obj) {
    const classInfo = obj[className]
    let nameRepeat: { [prop: string]: number } = {}
    const funcList = classInfo.map((apiInfo) => {
      // 后端没有返回正确函数名称的时候, 根据url生成
      // let funcName = apiInfo.funcName ? toLowerCaseFirst(apiInfo.funcName) : getFuncName(apiInfo.url, className)
      let funcName = apiInfo.funcName
        ? toLowerCaseFirst(apiInfo.funcName)
        : getFuncNameByOpenApi(apiInfo.url, className, apiInfo.mode)
      handleRepeatName(funcName, nameRepeat)

      const withPath = hasHandlePath(apiInfo)
      const withParams = hasHandleParams(apiInfo)
      const withData = hasHandleData(apiInfo)

      const mode = apiInfo.mode.toUpperCase()
      const desc = Desc(apiInfo.desc)
      const args = [withPath && 'path', withParams && 'params', withData && 'data'].filter((f) => f).join(', ')
      const req = [withParams ? 'params' : '', withData ? 'data' : '']
        .filter((f) => f)
        .map((e) => `${e.split(':')[0]}: ${e.split(':')[0]},`)
        .join('\n  ')

      return apiTemplateStatic({ use: useAxios, url: apiInfo.url, method: mode, funcName, desc, args, req })
    })

    template += apiTemplateClass(className, funcList.join('\n'))
  }

  return template
}

/** 根据url生成的函数名称可能存在重复的情况, 防止api.ts报错, 重复名称统一处理成 `_[fnName]_[repeatCount]` */
const handleRepeatName = (funcName: string, nameRepeat: Indexable) => {
  if (nameRepeat[funcName]) {
    funcName = `_${funcName}_${nameRepeat[funcName]++}`
  } else {
    nameRepeat[funcName] = 1
  }
}

/** 是否存在路由传参, 存在则处理url */
const hasHandlePath = (apiInfo: ApiInfo): boolean => {
  if (!apiInfo.path?.length) return false
  apiInfo.path.forEach((item) => {
    apiInfo.url = apiInfo.url.replace(`{${item.name}}`, `\${path.${item.name}}`)
  })
  return true
}

/** 是否存在params传参 */
const hasHandleParams = (apiInfo: ApiInfo) => {
  return apiInfo.params?.length ? true : false
}

/** 是否存在data传参 */
const hasHandleData = (apiInfo: ApiInfo) => {
  return Object.keys(apiInfo.data ?? {}).length ? true : false
}
