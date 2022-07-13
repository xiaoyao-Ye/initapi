
import { PathItemObject, OperationObject, PathsObject, ParameterObject, ReferenceObject, RequestBodyObject, ResponseObject, SchemaObject } from "openapi3-ts";
import { ApiInfo, Params, isReferenceObject, Data } from "../type";
import { clearCRLF } from "../utils";

export const formatApi = (data: PathsObject) => {
  const apiClassInfo: { [className: string]: ApiInfo[] } = {};
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

      const API_CLASS_NAME = API.tags![0];
      if (!Array.isArray(apiClassInfo[API_CLASS_NAME])) apiClassInfo[API_CLASS_NAME] = [];
      apiClassInfo[API_CLASS_NAME].push(apiInfo);
    }
  }
  return apiClassInfo;
}

const useArgs = (args: (ParameterObject | ReferenceObject)[] = []) => {
  const path: Params[] = []
  const params: Params[] = []

  for (var i = 0; i < args.length; i++) {
    const item = args[i];

    // TS 类型存在 ReferenceObject , 但是实际好像并不会有, 所以暂不处理此类型
    if (isReferenceObject(item)) continue;

    const query: Params = {
      $ref: item.$ref,
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
  if (!firstKey) return {};

  if (firstKey === 'multipart/form-data') return { isFormData: true };

  const schema = obj.content[firstKey].schema ?? {};
  if (isReferenceObject(schema)) return { schema: { $ref: schema.$ref } };

  if (schema.type === 'object') {
    const propList: { name: string, type: string, desc: string, nullable: boolean }[] = [];
    for (const propName in schema.properties) {
      const prop: SchemaObject = schema.properties[propName];
      propList.push({
        name: propName,
        desc: clearCRLF(prop.description ?? ""),
        type: prop.type ?? "",
        nullable: prop.nullable ?? false
      })
    }
    return { propList }
  }
  return { schema: schema };
}

const useResponses = (obj: { [defaultOrStatusCode: string | number]: ResponseObject | ReferenceObject }) => {
  for (const key in obj) {
    const item = obj[key];
    if (isReferenceObject(item)) return { $ref: item.$ref };
    if (!item.content) continue;
    const firstKey = Object.keys(item.content)[0];
    return item.content[firstKey].schema;
  }
}