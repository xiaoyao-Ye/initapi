import { ParameterObject, ReferenceObject, SchemaObject } from "openapi3-ts/oas31";
import { Parameters, isReferenceObject } from "../type";

/** 收集 request parameters 信息 */
const getParameters = (parameters: ((ParameterObject & { type?: string }) | ReferenceObject)[] = []) => {
  const path: Parameters[] = [];
  const params: Parameters[] = [];
  for (const item of parameters) {
    // 类型存在 ReferenceObject , 实际好像并不会有, 暂不处理此类型.
    if (isReferenceObject(item)) continue;
    // 仅处理 in === path || in === query 的参数
    if (item.in === "header" || item.in === "cookie") continue;
    const parameter: Parameters = {
      name: item.name,
      description: item.description ?? "",
      schema: item.schema ? item.schema : ({ type: item?.type } as SchemaObject),
    };
    if (item.in === "path") path.push(parameter);
    else if (item.in === "query") params.push(parameter);
  }
  return { path, params };
};

export { getParameters };
