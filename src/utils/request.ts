import converter from 'swagger2openapi';
import { OpenAPIObject } from 'openapi3-ts';
import { isHttp, readJson } from './index';
import axios from 'axios';

export const getInitData = async (url: string) => {
  let data: OpenAPIObject;
  if (!isHttp(url)) {
    data = readJson(url)
  } else {
    try {
      const res = await axios.get(url)
      data = res.data
    } catch (error: any) {
      throw new Error(error)
    }
  }

  if (!data?.openapi) data = await transformOpenApi(data);

  return data;
}

const transformOpenApi = async (data: OpenAPIObject) => {
  const { openapi } = await (converter as any).convertObj(data, {});
  return openapi;
}