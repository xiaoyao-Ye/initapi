export const apiTemplateImport = (importNameList: string[]) => `
import { defHttp } from 'zl-axios';
import {${importNameList.join(', ')}} from './entity';
`


interface Args {
  /** 请求路径 */
  url: string;
  /** 请求方法 */
  method: string;
  /** 函数名称 */
  funcName: string;
  /** 函数备注 */
  desc: string;
  /** 函数参数 */
  args: string;
  /** 请求参数 */
  req: string;
  /** 响应类型 */
  res: string;
}
/**
 * 返回函数模板
 * @returns 模板字符串
 */
export const apiTemplateStatic = ({ url, method, funcName, desc, args, req, res }: Args) => `
${desc}
static ${funcName}(${args}){
  return defHttp.request<${res}>({
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