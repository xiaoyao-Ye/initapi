import { SchemaObject } from 'openapi3-ts'

export type Indexable = { [prop: string]: any }

/** 判读是否 ReferenceObject 类型 */
export function isReferenceObject(obj: ReferenceObject | any): obj is ReferenceObject {
  return obj.hasOwnProperty('$ref')
}

export class ReferenceObject {
  /** DTO地址 */
  $ref?: string
}

export interface EntityPropInfo {
  $ref: string
  /** 属性名称 */
  name: string
  /** 属性类型 */
  type: string
  /** 属性备注 */
  desc: string
  /** 是否必填 */
  nullable: boolean
  /** type为Array的情况下数组value的类型, 只有 基础类型[] | DTO[] */
  items?: SchemaObject | ReferenceObject
  /** type为object的情况下会有,应是DTO为Map结构, 95%生成不存在 Map<string, additionalProp(基础类型 | DTO)> */
  additionalProperties?: SchemaObject | ReferenceObject | boolean

  // [prop: string]: any;
}

export class EntityInfo {
  /** entity名 */
  name: string = ''
  /** 备注 */
  desc: string = ''
  /** 属性信息 */
  propList: Array<EntityPropInfo> = []
}

export class EnumInfo {
  /** enum名 */
  name: string = ''
  /** 备注 */
  desc: string = ''
  /** 枚举信息 */
  enumList: string[] = []
}

export class ApiInfo {
  /** 后端的接口方法名 */
  funcName?: string | undefined = ''
  /** api地址 */
  url: string = ''
  /** 概要 */
  summary: string = ''
  /** 备注 */
  desc: string = ''
  /** 请求方式 */
  mode: string = ''
  /** 路由传参 */
  path?: Params[] = []
  /** ?传参 */
  params?: Params[] = []
  /** body传参 请求体 */ // type object 有 properties 属性对象, 里面是每个属性参数的信息
  data?: Data
  /** 响应体 */
  res?: SchemaObject | ReferenceObject | {} = {}
}

export class Data {
  /** 优先判断formData */
  isFormData?: boolean
  /** 在判断是否 ReferenceObject , 剩下 SchemaObject */
  schema?: SchemaObject | ReferenceObject
  /** data属性列表 */
  propList?: { name: string; type: string; desc: string; nullable: boolean }[] = []
}

/** path, params 的类型放在 schema 属性里面 */
export class Params {
  $ref?: string
  /** 参数名 */
  name: string = ''
  /** 备注 */
  desc: string = ''
  /** 是否必填 */
  nullable: boolean = false
  /** 参数类型 */
  schema?: SchemaObject = undefined
}

export interface Config {
  import?: string
  swagger?: { [prop: string]: string }
  /** TS entity的属性是否可空, false根据文档生成, true 会加上? */
  nullable?: boolean
  /** entity class construct */
  /** api 返回类型默认值 Object.assign 或 new class(有一个问题是需要分辨是enum还是class) 理论上后端或者前端自行处理比较合理, api处理作用将不再单一 */
}
