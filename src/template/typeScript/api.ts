export const apiTemplateImport = (importAxios: string, importNameList: string[]) => `
/* eslint-disable */
// 该文件由 initAPI 自动生成，请勿手动修改！

${importAxios}
import {${importNameList.join(', ')}} from './entity';
`

interface Args {
  /** request方法 */
  use: string
  /** 请求路径 */
  url: string
  /** 请求方法 */
  method: string
  /** 函数名称 */
  funcName: string
  /** 函数备注 */
  desc: string
  /** 函数参数 */
  args: string
  /** 请求参数 */
  req: string
  /** 响应类型 */
  res: string
}
/**
 * 返回函数模板
 * @returns 模板字符串
 */
export const apiTemplateStatic = ({ use, url, method, funcName, desc, args, req, res }: Args) => `
${desc}
static async ${funcName}(${args}){
  return ${use}<${res}>({
    url: \`${url}\`,
    method: '${method}',
    ${req}
  });
}
`
/**
 * 一个api服务的类
 * @param name api类名
 * @param funcList api函数列表
 * @returns 模板字符串
 */
export const apiTemplateClass = (name: string, funcList: string) => `
export class ${name} {
  ${funcList}
}
`
