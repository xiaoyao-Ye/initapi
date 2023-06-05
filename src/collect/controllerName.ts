import { TagObject } from "openapi3-ts/oas31";
import { replaceSpecialChars } from "./helper";

/**
 * 保留初始 name
 * name 匹配所有非中文、数字、字母和下划线的字符, 并将其替换为下划线
 * 判断 name 是否存在中文
 * 存在中文则根据 commonPrefix 去 url 中取 name, 并配所有非中文、数字、字母和下划线的字符, 并将其替换为下划线
 * 将 name 首字母大写, 将下划线后的字母大写并去掉下划线
 * 根据 tags 找与 name 对应的tag获取 description (根据最初的 name 去匹配)
 */
const getControllerName = (name: string = "Common", tags: TagObject[]) => {
  const qualified = replaceSpecialChars(name);
  const pattern = /[\u4e00-\u9fa5]/g;
  const withChinese = pattern.test(qualified);
};

export { getControllerName };
