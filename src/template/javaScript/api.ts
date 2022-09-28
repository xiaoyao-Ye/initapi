export const apiTemplateImport = () => `
import { defHttp } from 'zl-axios';
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
}
/**
 * 返回函数模板
 * @returns 模板字符串
 */
export const apiTemplateStatic = ({ use, url, method, funcName, desc, args, req }: Args) => `
${desc}
static ${funcName}(${args}){
  return ${use}({
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
