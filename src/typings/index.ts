import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

/** 判断是否 ReferenceObject 类型 */
const isReferenceObject = (obj: ReferenceObject | any = {}): obj is ReferenceObject => {
  return obj.hasOwnProperty("$ref");
};

type Indexable<T = any> = { [key: string]: T };

/** schema 类型, 处理openapi.json后拿到的数据都是明确的, 除了 schema 里面的属性, 有可能是 ReferenceObject, 也有可能是 SchemaObject */
type Schema = SchemaObject | ReferenceObject;

/** 如果是 FormData 类型会返回 */
type Data = Schema | "FormData";

interface Parameters {
  /** 参数名 */
  name: string;
  /** 备注 */
  description: string;
  /** schema */
  schema: Schema;
}

interface Api {
  /** 后端的接口方法名(函数名称) */
  name?: string;
  /** api地址 */
  url: string;
  /** 概要 */
  summary: string;
  /** 备注 */
  description: string;
  /** 请求方式 */
  method: string;
  /** 路由传参 */
  path?: Parameters[];
  /** ?传参 */
  params?: Parameters[];
  /** body传参 请求体 */ // type object 有 properties 属性对象, 里面是每个属性参数的信息
  data?: Data;
  /** 响应体 */
  response?: Schema | Record<string, unknown>;
}

// entity 和 enum 本身就是 Schema 类型, 看下怎么处理
interface Enum {
  name: string;
  description: string;
  enumList: string[];
}

interface Interface {
  name: string;
  description: string;
  propList: InterfaceProp[];
}

interface InterfaceProp {
  name: string;
  description: string;
  required: boolean;
  type?: string;
  $ref?: string;
  items?: Schema;
  enum?: any[];
  additionalProperties?: Schema | boolean;
  propList?: InterfaceProp[];
}

type ApiMap = Record<string, { description: string; apiList: Api[] }>;

export { Indexable, Schema, Data, Parameters, Api, ApiMap, Enum, Interface, InterfaceProp, isReferenceObject };
