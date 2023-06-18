import { ReferenceObject, ResponseObject, ResponsesObject } from "openapi3-ts/oas31";
import { Schema, isReferenceObject } from "../typings";

/** 收集 response 信息 */
const getResponses = (responses: ResponsesObject = {}): Schema => {
  for (const [_key, item] of Object.entries<ResponseObject | ReferenceObject>(responses)) {
    if (isReferenceObject(item)) return item;
    if (!item.content) continue;
    const mediaType = Object.keys(item.content)[0];
    return item.content[mediaType].schema;
  }
};

export { getResponses };
