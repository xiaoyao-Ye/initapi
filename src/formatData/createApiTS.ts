import { ApiInfo, Indexable } from '../type'
import { Desc, getFuncNameByOpenApi, toCamelCase, toLowerCaseFirst } from '../utils'

export const createApiTS = (
  apiTagInfo: { [className: string]: { desc: string, tagInfo: ApiInfo[] } },
  entityEnumNameList: string[],
) => {
  let importNameList: string[] = []

  let apiList = []

  for (let tagName in apiTagInfo) {
    tagName = entityEnumNameList.includes(tagName) ? `${tagName}Api` : tagName
    let nameRepeat: { [prop: string]: number } = {}
    const funcList = apiTagInfo[tagName].tagInfo.map((apiInfo) => {
      // 后端没有返回正确函数名称的时候, 根据url生成
      // let funcName = apiInfo.funcName ? toLowerCaseFirst(apiInfo.funcName) : getFuncName(apiInfo.url, tagName)
      let funcName = apiInfo.funcName
        ? toLowerCaseFirst(apiInfo.funcName)
        : getFuncNameByOpenApi(apiInfo.url, tagName, apiInfo.mode)
      funcName = toCamelCase(funcName);
      /** 根据url生成的函数名称可能存在重复的情况, 防止api.ts报错, 重复名称统一处理成 `_[fnName]_[repeatCount]` */
      handleRepeatName(funcName, nameRepeat)

      const withPath = hasHandlePath(apiInfo, importNameList)
      const withParams = hasHandleParams(apiInfo, importNameList)
      const withData = hasHandleData(apiInfo, importNameList)
      const res = handleResType(apiInfo, importNameList)

      const mode = apiInfo.mode.toUpperCase()
      const desc = Desc(`${apiInfo.summary}${apiInfo.desc ? '-' + apiInfo.desc : ''}`)
      const args = [withPath, withParams, withData].filter((f) => f).join(', ')
      const req = [withParams && 'params', withData && 'data']
        .filter((f) => f)
        .map((e) => `${e}: ${e},`)
        .join('\n  ')

      return { url: apiInfo.url, method: mode, funcName, desc, args, req, res }
    })
    apiList.push({ tagName, desc: Desc(apiTagInfo[tagName].desc), funcList })
  }

  let importEntityName = [...new Set(importNameList)].join(', ')

  return { apiList, importEntityName }
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
const hasHandlePath = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!apiInfo.path?.length) return
  const propList = apiInfo.path.map((item) => {
    apiInfo.url = apiInfo.url.replace(`{${item.name}}`, `\${path.${item.name}}`)
    return `${item.name}: ${transType(item.schema, importNameList)}`
  })
  return `path: {${propList.join(', ')}}`
}

/** 是否存在params传参 */
const hasHandleParams = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!apiInfo.params?.length) return
  const propList = apiInfo.params.map((q) => `${q.name}?: ${transType(q.schema, importNameList)}`)
  return `params?: {${propList.join(', ')}}`
}

/** 是否存在data传参 */
const hasHandleData = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!Object.keys(apiInfo.data ?? {}).length) return
  let data
  if (apiInfo.data?.isFormData) {
    data = 'FormData'
  } else if (apiInfo.data?.propList?.length) {
    const propList = apiInfo.data.propList.map((item) => {
      return `${item.name}${item.nullable ? '' : '?'}:${transType(item, importNameList)}`
    })
    data = `{ ${propList.join(', ')} }`
  } else {
    data = transType(apiInfo.data?.schema, importNameList)
  }
  return `data?: ${data}`
}

/** api的返回类型 */
const handleResType = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!Object.keys(apiInfo.res ?? {}).length) return 'void'
  return transType(apiInfo.res, importNameList)
}

/**
 *
 * @param schema 类型过于复杂参考 EntityPropInfo | SchemaObject | ReferenceObject
 * @param importNameList 记录DTO
 */
export const transType = (schema: any = {}, importNameList?: string[]): string => {
  if (schema.$ref) {
    const DTO_NAME = schema.$ref.split('/').pop()
    importNameList && importNameList.push(DTO_NAME)
    return DTO_NAME
  }

  // TODO: SchemaObjectType SchemaObjectFormat 类型可做参考
  const numberEnum = ['integer', 'long', 'float', 'double', 'number', 'int', 'int32', 'int64']
  if (schema.type === 'string') {
    return 'string'
  } else if (numberEnum.includes(schema.type)) {
    return 'number'
  } else if (schema.type === 'boolean') {
    return 'boolean'
  } else if (schema.type === 'array') {
    return `Array<${transType(schema.items, importNameList)}>`
  } else if (schema.type === 'object') {
    return `Map<string, ${
      schema.additionalProperties ? transType(schema.additionalProperties, importNameList) : 'any'
    }>`
    // return `{ [prop: string]: ${schema.additionalProperties ? transTypeTS(schema.additionalProperties, record) : 'any'} }`
  } else {
    console.log('untreated type: 7', schema)
    return 'any'
  }
}
