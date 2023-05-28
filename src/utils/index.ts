import { isAbsolute, join } from "path";
import fs from "fs";
import jiti from "jiti";

export const tryRequire = (id: string, rootDir: string = process.cwd()) => {
  const _require = jiti(rootDir, { interopDefault: true });
  try {
    return _require(id);
  } catch (err: any) {
    if (err.code !== "MODULE_NOT_FOUND") {
      console.error(`Error trying import ${id} from ${rootDir}`, err);
    }
    return {};
  }
};

/**
 * 读取json文件
 * @param url 文件路径
 * @returns JSON.parse后的数据
 */
export const readJson = (url: string) => {
  // 转义并将路径处理成正确的当前系统(window和mac的路径差异)路径
  let URL = join(String.raw`${url}`);
  // 处理成绝对路径
  if (!isAbsolute(URL)) URL = join(process.cwd(), URL);
  try {
    return JSON.parse(fs.readFileSync(URL, "utf-8"));
  } catch (error) {
    throw new Error("读取json文件错误!");
  }
};

/** 是否网址 */
export const isHttp = (url: string): boolean => {
  // return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(url)
  return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
};

/** 清除\r\n */
export const clearCRLF = (desc: string) => (desc ?? "").replace(/\r\n/g, "");

/**
 * 字符串首字母转换为小写
 * @param funcName 函数名称
 * @returns 函数名称首字母小写
 */
export const toLowerCaseFirst = (funcName: string = "") => {
  return funcName.charAt(0).toLowerCase() + funcName.slice(1);
};

/**
 * 根据url获取函数名称 去除url中的 {} 内容
 * @param url api地址
 * @param className api的class name
 * @returns 函数名称
 */
export const getFuncName = (url: string, className: string): string => {
  const reg = /\/{[\w]*\}/g;
  const urlStr = url.replace(reg, "");
  const urlArr = urlStr.split("/");
  // 目前的方案是去掉url的{}后截取className往后的所有str组成函数名称(目前好像效果好很多), 如果一个都没有,取最后一个
  // 之前的方案是去掉url的{}后通过/分割, 使用数组最后一个str作为函数名称
  const index = urlArr.findIndex(f => f === className);
  const name = urlArr
    .splice(index + 1)
    .map(m => m.charAt(0).toUpperCase() + m.slice(1))
    .join("");
  return toLowerCaseFirst(name || urlArr[urlArr.length - 1]);
};

/**
 * 根据openApi规则生成函数名称
 * @param url api地址
 * @param className api的class name
 * @param method 请求方法
 * @returns 函数名称
 */
export const getFuncNameByOpenApi = (url: string, className: string, method: string): string => {
  // 移除url字符串中的花括号
  const reg = /\{|\}/g;
  const urlStr = url.replace(reg, "");
  const urlArr = urlStr.split("/");
  const index = urlArr.findIndex(f => f === className);
  const name = urlArr.splice(index + 1).join("_");
  return `${method}_${name}`;
};

/**
 * 传入注释字符串 不为空则返回 \/** desc *\/ 格式
 * @param desc 备注
 */
export const Desc = (desc: string) => {
  return desc ? `/** ${desc} */` : "";
};

/**
 * 转换成驼峰
 * @param str xx-xx-xx
 * @returns xxXxXx
 */
export const toCamelCase = (str: string) => {
  return str.replace(/(-\w)/g, m => m[1].toUpperCase()).replace(/-/g, "");
};

/**
 * 去掉字符串中的空字符, 并且将字符串中的-替换成_
 * @param str stri ng- string
 * @returns string_string
 */
export const processString = (str: string): string => {
  return str.replace(/\s/g, "").replace(/-/g, "_");
};

// export const replaceSpecialChars = (str: string): string => {
//   // 正则表达式匹配非字母、数字和下划线的字符
//   const pattern = /[^a-zA-Z0-9_]/g;
//   return str.replace(pattern, '_');
// }

/**
 * 匹配所有非中文、数字、字母和下划线的字符
 * @param str
 * @returns 将匹配到的字符替换为下划线
 */
export const replaceSpecialChars = (str: string): string => {
  const regex = /[^\u4e00-\u9fa5\w]/g;
  return str.replace(regex, "_");
};
