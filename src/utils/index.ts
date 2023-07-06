import { isAbsolute, join } from "path";
import fs from "fs";
import jiti from "jiti";
import { consola } from "consola";

export const tryRequire = (id: string, rootDir: string = process.cwd()) => {
  const _require = jiti(rootDir, { interopDefault: true });
  try {
    return _require(id);
  } catch (err: any) {
    if (err.code !== "MODULE_NOT_FOUND") {
      consola.error(`Error trying import ${id} from ${rootDir}`, err);
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
// export const clearCRLF = (desc: string) => (desc ?? "").replace(/\r\n/g, "");

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
// export const getFuncName = (url: string, className: string): string => {
//   const reg = /\/{[\w]*\}/g;
//   const urlStr = url.replace(reg, "");
//   const urlArr = urlStr.split("/");
//   // 目前的方案是去掉url的{}后截取className往后的所有str组成函数名称(目前好像效果好很多), 如果一个都没有,取最后一个
//   // 之前的方案是去掉url的{}后通过/分割, 使用数组最后一个str作为函数名称
//   const index = urlArr.findIndex(f => f === className);
//   const name = urlArr
//     .splice(index + 1)
//     .map(m => m.charAt(0).toUpperCase() + m.slice(1))
//     .join("");
//   return toLowerCaseFirst(name || urlArr[urlArr.length - 1]);
// };

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

// /**
//  * 匹配所有非中文、数字、字母和下划线的字符
//  * @param str
//  * @returns 将匹配到的字符替换为下划线
//  */
// export const replaceSpecialChars = (str: string): string => {
//   const regex = /[^\u4e00-\u9fa5\w]/g;
//   return str.replace(regex, "_");
// };

// export const getCommonPrefix = (list: string[]): string => {
//   let obj = {};
//   list.forEach(url => {
//     const arr = url.split("/");
//     for (let i = 1; i < arr.length - 1; i++) {
//       const key = "/" + arr.slice(1, i + 1).join("/");
//       obj[key] = obj[key] ? obj[key] + 1 : 1;
//     }
//   });

//   const sortedEntries = Object.entries(obj).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
//   const [maxKey, secondKey] = sortedEntries.slice(0, 2).map(entry => entry[0]);

//   if (obj[maxKey] - obj[secondKey] < list.length / 10) return secondKey;

//   return maxKey;
// };

// export const wordToUpperCase = (str: string) => {
//   return str
//     .split("_")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join("");
// };

/** 清除\r\n */
const clearCRLF = (str: string) => (str ?? "").replace(/\r\n/g, "");

/**
 * 传入注释字符串 不为空则返回 \/** description *\/ 格式
 * @param description 备注
 */
const useDescription = (description: string) => {
  description = clearCRLF(description);
  return description ? `/** ${description} */` : "";
};

/** JS关键字 */
const keyWord = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
];

/**
 * 根据url获取函数名
 * 默认情况移除url中的{}符号, 移除controller name, 取接下来的所有单词一起作为函数名, 如果为空则url移除commonPrefix, 然后将剩余的url按照'/'分割,
 * 如果出现重复, 则在函数名前面加上http method
 */
const getFuncName = (
  url: string,
  controllerName: string,
  commonPrefix: string,
  method: string,
  nameRepeat: Record<string, number>,
): string => {
  /** 替换字符串中的 /{*} 为 '' */
  url = url.replace(/\/\{[^{}]*\}/g, "");
  // 如果匹配不到, 尝试将controllerName首字母小写再次匹配
  if (!url.includes(controllerName)) controllerName = controllerName.charAt(0).toLowerCase() + controllerName.slice(1);
  let nameSlice = url.split(controllerName)?.[1]?.split("/")?.slice(1) ?? [];
  if (nameSlice.length === 0) {
    if (url.includes(commonPrefix)) url = url.replace(commonPrefix, "");
    const pathSlice = url.split("/");
    nameSlice = pathSlice.slice(2).length === 0 ? pathSlice.slice(0) : pathSlice.slice(2);
  }
  let name = nameSlice.map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join("");

  if (nameRepeat[name]) {
    nameRepeat[name]++;
    return `${method.toLowerCase()}_${name}`;
  } else {
    nameRepeat[name] = 1;
    return name;
  }
};

/**
 * 匹配所有非中文、数字、字母和下划线的字符
 * 如果是数字开头, 则在前面加上_
 * @param str
 * @returns 将匹配到的字符替换为下划线
 */
const replaceSpecialChars = (str: string): string => {
  const regex = /[^\u4e00-\u9fa5\w]/g;
  str = str.replace(regex, "_");
  if (/^\d/.test(str)) str = "_" + str;
  return str;
};

/** 下划线转为驼峰命名(不会处理首字符的_) */
const transformString = (str: string) => {
  let underline = "";
  if (str.startsWith("_")) {
    underline = "_";
    str = str.slice(1);
  }
  str.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
  str = str.charAt(0).toLowerCase() + str.slice(1);
  if (keyWord.includes(str)) str = str.charAt(0).toUpperCase() + str.slice(1);

  return underline + str;
};

/** 将首字母以及下划线后的字母大写(不会处理首字符的_) */
const wordToUpperCase = (str: string) => {
  let underline = "";
  if (str.startsWith("_")) {
    underline = "_";
    str = str.slice(1);
  }
  return (
    underline +
    str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  );
};

const getCommonPrefix = (list: string[]): string => {
  let obj = {};
  list.forEach(url => {
    const arr = url.split("/");
    for (let i = 1; i < arr.length - 1; i++) {
      const key = "/" + arr.slice(1, i + 1).join("/");
      obj[key] = obj[key] ? obj[key] + 1 : 1;
    }
  });

  const sortedEntries = Object.entries(obj).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
  const [maxKey, secondKey] = sortedEntries.slice(0, 2).map(entry => entry[0]);

  if (obj[maxKey] - obj[secondKey] < list.length / 10) return secondKey;

  return maxKey;
};

export { useDescription, getFuncName, replaceSpecialChars, wordToUpperCase, getCommonPrefix, transformString };
