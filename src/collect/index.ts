import { OperationObject, PathsObject, TagObject } from "openapi3-ts/dist/oas31";
import { getCommonPrefix, isNeedCollect } from "./helper";
import { getParameters } from "./parameters";
import { getResponses } from "./response";
import { getRequestBody } from "./body";
import { Api, ApiMap } from "../type";
import { getControllerName } from "./controllerName";

/** 收集 api 信息 */
const collectAPI = (source: PathsObject, tags: TagObject[], commonPrefix: string) => {
  if (!commonPrefix) commonPrefix = getCommonPrefix(Object.keys(source));

  const apiMap: ApiMap = {};

  const recordControllerName = {};

  for (const [url, pathItem] of Object.entries(source)) {
    for (const [method, API] of Object.entries<OperationObject | any>(pathItem)) {
      if (!isNeedCollect(method)) continue;

      const { parameters, requestBody, operationId, summary, description, responses } = API as OperationObject;

      const { path, params } = getParameters(parameters);
      const data = getRequestBody(requestBody);
      const response = getResponses(responses);

      const api: Api = { url, method, name: operationId, summary, description, path, params, data, response };

      const controllerName = getControllerName(API.tags?.[0], recordControllerName, commonPrefix, url);

      if (!apiMap[controllerName]) {
        // 也许可以放到两个for循环外面, 根据recordControllerName去给apiMap赋值description
        const tag = tags.find(tag => tag.name === API.tags?.[0]);
        apiMap[controllerName] = { description: tag?.description ?? "", apiList: [] };
      }

      apiMap[controllerName].apiList.push(api);
    }
  }
  return apiMap;
};

export { collectAPI };
