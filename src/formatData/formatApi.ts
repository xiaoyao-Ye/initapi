
import { PathItemObject, OperationObject, PathsObject, ParameterObject, ReferenceObject, RequestBodyObject, SchemaObject, ResponsesObject, TagObject } from "openapi3-ts/dist/mjs";
import { ApiInfo, Params, isReferenceObject, Data, isSchemaObjectTypeArray } from "../type";
import { clearCRLF, processString } from "../utils";

export const formatApi = (data: PathsObject, tags: TagObject[]) => {
  // const apiClassInfo: { [className: string]: ApiInfo[] } = {};
  const apiTagInfo: { [className: string]: { desc: string, tagInfo: ApiInfo[] } } = {};
  // const apiTagInfo: { tagName: string, desc: string, tagInfo: ApiInfo}[] = [];
  for (const PATH in data) {
    const API_INFO: PathItemObject = data[PATH];
    for (const MODE in API_INFO) {
      const modeList = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
      if (!modeList.includes(MODE)) continue;
      const API: OperationObject = API_INFO[MODE];

      const { path, params } = useArgs(API.parameters);
      const body = useRequestBody(API.requestBody);
      const res = useResponses(API.responses);
      const apiInfo: ApiInfo = {
        url: PATH,
        mode: MODE,
        funcName: API.operationId,
        summary: clearCRLF(API.summary ?? ""),
        desc: clearCRLF(API.description ?? ""),
        path: path,
        params: params,
        data: body,
        res: res
      }

      const API_TAG_NAME = processString(API.tags?.[0] ?? "Common");
      if (!apiTagInfo[API_TAG_NAME]) {
        const desc = tags.filter(f => f.name === API_TAG_NAME)[0]?.description
        apiTagInfo[API_TAG_NAME] = {desc: clearCRLF(desc ?? ''), tagInfo: []};
      }
      apiTagInfo[API_TAG_NAME].tagInfo.push(apiInfo);
    }
  }
  return apiTagInfo;
}

const useArgs = (args: (ParameterObject | ReferenceObject)[] = []) => {
  const path: Params[] = []
  const params: Params[] = []

  for (var i = 0; i < args.length; i++) {
    const item = args[i];

    // TS 类型存在 ReferenceObject , 但是实际好像并不会有, 所以暂不处理此类型
    if (isReferenceObject(item)) {
      console.log('untreated type: 1 ReferenceObject', item)
      continue;
    }

    if (item.in === 'header' || item.in === 'cookie') {
      // console.log('untreated type: 2', item)
      continue;
    }

    const query: Params = {
      name: item.name,
      desc: clearCRLF(item.description ?? ""),
      nullable: item.required ?? false,
      schema: item.schema
    }

    if (item.in === 'path') path.push(query);
    else if (item.in === 'query') params.push(query)
  }
  return { path, params }
}

const useRequestBody = (obj: RequestBodyObject | ReferenceObject | undefined): Data => {
  if (!obj || !Object.keys(obj).length) return {};
  if (isReferenceObject(obj)) return { schema: { $ref: obj.$ref } };

  const firstKey = Object.keys(obj.content)[0];
  /** 不存在 mediaType, 没有请求参数 */
  if (!firstKey) return {};

  /** FormData 类型只有 multipart/form-data , content不可能存在其他 mediaType */
  if (firstKey === 'multipart/form-data') return { isFormData: true };

  /** 除了 FormData 以外的任何 mediaType, 不管存在几个, 内容都是一致的, 取第一个即可 */
  const schema = obj.content[firstKey].schema ?? {};
  if (isReferenceObject(schema)) return { schema: { $ref: schema.$ref } };

  /** SchemaObject 类型中, 只有 object 需要结构扁平化, 其余类型后续一起作为 schema 类型处理 */
  if (schema.type === 'object') {
    const propList: { $ref?: string, name: string, type: string, desc: string, nullable: boolean }[] = [];
    // const propList: (ReferenceObject | SchemaObject)[] = [];
    for (const propName in schema.properties) {
      // const prop: ReferenceObject | SchemaObject = schema.properties[propName];
      // if (isReferenceObject(prop)) {
      //   propList.push({ name: propName, $ref: prop.$ref });
      //   continue;
      // } else {
      //   // propList.push(prop)
      //   propList.push({
      //     name: propName,
      //     desc: clearCRLF(prop.description ?? ""),
      //     type: prop.type ?? "",
      //     nullable: prop.nullable ?? false
      //   })
      // }
      // TODO: 为了便于类型转换成 propList 先强行转类型
      const prop = schema.properties[propName] as ReferenceObject & SchemaObject;
      if (isSchemaObjectTypeArray(prop.type)) {
        console.log('untreated type: 5', prop);
        continue;
      }

      propList.push({
        $ref: prop?.$ref,
        name: propName,
        desc: clearCRLF(prop.description ?? ""),
        type: prop.type ?? "",
        nullable: prop.nullable ?? false,
      })
    }
    return { propList }
  }
  return { schema };
}

const useResponses = (obj: ResponsesObject) => {
  /** key 是 default 或者请求成功的响应状态码(200) */
  for (const key in obj) {
    const item = obj[key];
    if (isReferenceObject(item)) return { $ref: item.$ref };
    if (!item.content) continue;
    /**
     * 这里的可以是 text/plain application/json text/json 等:
     * 不管存在几个, 内容都是一致的, 取第一个即可
     */
    const firstKey = Object.keys(item.content)[0];
    return item.content[firstKey].schema;
  }
}