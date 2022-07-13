export const apiTemplateImport = (importNameList: string[]) => `
import { defHttp } from 'zl-axios';
import {${importNameList.join(', ')}} from './entity';
`

/**
 * 返回函数模板
 * @param url 请求路径
 * @param method 请求方法
 * @param funcName 函数名称
 * @param desc 函数备注
 * @param args 函数参数
 * @param req 请求参数
 * @returns 模板字符串
 */
export const apiTemplateStatic = (url: string, method: string, funcName: string, desc: string, args: string, req: string, res: string) => `
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