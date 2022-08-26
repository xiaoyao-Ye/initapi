import { ApiInfo, EntityInfo, EnumInfo } from "../../type"
import { Desc, getFuncNameByOpenApi, toLowerCaseFirst } from "../../utils";
import { apiTemplateClass, apiTemplateImport, apiTemplateStatic } from "./api";
import { entityTemplate, entityTemplateClassProp } from "./entity"


export const createApiTS = (apiClassInfo: { [className: string]: ApiInfo[] }, entityEnumNameList: string[]) => {
  let template = '';
  let importNameList: string[] = [];
  for (const className in apiClassInfo) {
    const classInfo = apiClassInfo[className];
    let nameRepeat: { [prop: string]: number } = {}
    const funcList = classInfo.map(apiInfo => {
      // 后端没有返回正确函数名称的时候, 根据url生成
      // let funcName = apiInfo.funcName ? toLowerCaseFirst(apiInfo.funcName) : getFuncName(apiInfo.url, className)
      let funcName = apiInfo.funcName ? toLowerCaseFirst(apiInfo.funcName) : getFuncNameByOpenApi(apiInfo.url, className, apiInfo.mode)
      /** 根据url生成的函数名称可能存在重复的情况, 防止api.ts报错, 重复名称统一处理成 `_[fnName]_[repeatCount]` */
      if (nameRepeat[funcName]) {
        funcName = `_${funcName}_${nameRepeat[funcName]++}`
      } else {
        nameRepeat[funcName] = 1
      }

      const pathStr = hasHandlePath(apiInfo, importNameList);
      const withParams = hasHandleParams(apiInfo, importNameList);
      const withData = hasHandleData(apiInfo, importNameList);
      const res = handleResType(apiInfo, importNameList);

      const mode = apiInfo.mode.toUpperCase()
      const desc = Desc(`${apiInfo.summary}${apiInfo.desc ? ('_' + apiInfo.desc) : ''}`);
      const args = [pathStr, withParams, withData].filter((f) => f).join(', ')
      const req = [withParams && 'params', withData && 'data'].filter((f) => f)
        .map((e) => `${e}: ${e},`)
        .join('\n  ')

      return apiTemplateStatic({ url: apiInfo.url, method: mode, funcName, desc, args, req, res });
    })

    const name = entityEnumNameList.includes(className) ? `${className}Api` : className;
    template += apiTemplateClass(name, funcList.join('\n'))
  }

  importNameList = [...new Set(importNameList)];
  // importNameList = importNameList.filter(f => entityEnumNameList.includes(f));
  template = apiTemplateImport(importNameList) + template;
  return template;
}


/** 是否存在路由传参, 存在则处理url */
const hasHandlePath = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!apiInfo.path?.length) return;
  const propList = apiInfo.path.map(item => {
    apiInfo.url = apiInfo.url.replace(`{${item.name}}`, `\${path.${item.name}}`);
    return `${item.name}: ${transType(item.schema, importNameList)}`
  })
  return `path: {${propList.join(', ')}}`;
}

/** 是否存在params传参 */
const hasHandleParams = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!apiInfo.params?.length) return;
  const propList = apiInfo.params.map((q) => `${q.name}?: ${transType(q.schema, importNameList)}`)
  return `params?: {${propList.join(', ')}}`;
}

/** 是否存在data传参 */
const hasHandleData = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!Object.keys(apiInfo.data ?? {}).length) return;
  let data;
  if (apiInfo.data?.isFormData) {
    data = 'FormData'
  } else if (apiInfo.data?.propList?.length) {
    const propList = apiInfo.data.propList.map(item => {
      return `${item.name}${item.nullable ? '' : '?'}:${transType(item, importNameList)}`
    })
    data = `{ ${propList.join(', ')} }`
  } else {
    data = transType(apiInfo.data?.schema, importNameList);
  }
  return `data?: ${data}`;
}

/** api的返回类型 */
const handleResType = (apiInfo: ApiInfo, importNameList: string[]) => {
  if (!Object.keys(apiInfo.res ?? {}).length) return 'void';
  return transType(apiInfo.res, importNameList);
}



export const createEntityTS = (
  entityInfoList: EntityInfo[],
  enumInfoList: EnumInfo[],
) => {
  let template = '';
  entityInfoList.forEach(item => {
    const propList = item.propList.map(prop => {
      const desc = Desc(prop.desc)
      const type = transType(prop);
      // openApi的规则为必填项, 实际可能非必填项, 此处将属性一律设置为可选
      return entityTemplateClassProp(prop.name, desc, type, false);
      // return entityTemplateClassProp(prop.name, desc, type, prop.nullable);
    });
    const desc = Desc(item.desc)
    template += entityTemplate('class', item.name, desc, propList.join('\n'))
  })
  enumInfoList.forEach(item => {
    const desc = Desc(item.desc)
    const propList = item.enumList.map((e) => `"${e}" = "${e}"`)
    template += entityTemplate('enum', item.name, desc, propList.join(',\n'));
  })

  return template;
}


/**
 * 
 * @param schema 类型过于复杂参考 EntityPropInfo
 * @param importNameList 记录DTO
 */
export const transType = (schema: any = {}, importNameList?: string[]): string => {
  if (schema.$ref) {
    const DTO_NAME = schema.$ref.split('/').pop()
    importNameList && importNameList.push(DTO_NAME)
    return DTO_NAME
  }

  const numberEnum = ['integer', 'long', 'float', 'double', 'number', 'int', 'int32', 'int64'];
  if (schema.type === 'string') {
    return 'string';
  } else if (numberEnum.includes(schema.type)) {
    return 'number'
  } else if (schema.type === 'boolean') {
    return 'boolean'
  } else if (schema.type === 'array') {
    return `Array<${transType(schema.items, importNameList)}>`
  } else if (schema.type === 'object') {
    return `Map<string, ${schema.additionalProperties ? transType(schema.additionalProperties, importNameList) : 'any'}>`
    // return `{ [prop: string]: ${schema.additionalProperties ? transTypeTS(schema.additionalProperties, record) : 'any'} }`
  } else {
    return 'any'
  }
}
