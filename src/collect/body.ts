import { ReferenceObject, RequestBodyObject } from "openapi3-ts/oas31";
import { isEmpty } from "./helper";
import { Data, isReferenceObject } from "../typings";

/** 收集 request body 信息 */
const getRequestBody = (requestBody: ReferenceObject | RequestBodyObject): Data => {
  if (isEmpty(requestBody)) return {};
  if (isReferenceObject(requestBody)) return requestBody;
  const mediaType = Object.keys(requestBody.content ?? {})[0];
  if (!mediaType) return {};
  if (mediaType === "multipart/form-data") return "FormData";
  return requestBody.content?.[mediaType]?.schema ?? {};
};

export { getRequestBody };
