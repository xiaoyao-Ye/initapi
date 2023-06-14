// import converter from "swagger2openapi";
import openapiParser from "./openapi-parser.mjs";
// import type { OpenAPIObject } from "openapi3-ts/dist/mjs";
import { OpenAPIObject } from "openapi3-ts/oas31";
import { isHttp, readJson } from "./index";
import axios from "axios";

export const getInitData = async (url: string): Promise<OpenAPIObject> => {
  try {
    let data: OpenAPIObject;
    if (!isHttp(url)) {
      data = readJson(url);
    } else {
      const res = await axios.get(url);
      data = res.data;
    }

    if (!data?.openapi) data = await transformOpenApi(data);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const transformOpenApi = async (data: OpenAPIObject): Promise<OpenAPIObject> => {
  // const { openapi } = await (converter as any).convertObj(data, { patch: true, warnOnly: true });
  const { openapi } = openapiParser.convertObj(data);
  return openapi as OpenAPIObject;

  // return new Promise(resolve => {
  //   import("./openapi-parser.mjs").then(({ default: { convertObj } }) => {
  //     const { openapi } = convertObj(data);
  //     resolve(openapi as OpenAPIObject);
  //   });
  // });
};
