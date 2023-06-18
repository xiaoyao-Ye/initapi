import { replaceSpecialChars, wordToUpperCase } from "../utils";

/**
 * 如果 controllerNameObj 中存在 name, 则直接返回, 否则进行以下操作
 * 保留初始 name
 * name 匹配所有非中文、数字、字母和下划线的字符, 并将其替换为下划线
 * 判断 name 是否存在中文
 * 存在中文则根据 commonPrefix 去 url 中取 name, 并配所有非中文、数字、字母和下划线的字符, 并将其替换为下划线
 * 将 name 首字母大写, 将下划线后的字母大写并去掉下划线
 * 将初始 name 作为 key, qualified 作为 value 存入 controllerNameObj
 */
const getControllerName = (
  name: string = "Common",
  controllerNameObj: Record<string, string>,
  commonPrefix?: string,
  url?: string,
): string => {
  if (controllerNameObj[name]) return controllerNameObj[name];

  const initialName = name;

  let qualified = replaceSpecialChars(name);
  const pattern = /[\u4e00-\u9fa5]/g;
  const withChinese = pattern.test(qualified);
  if (withChinese) {
    name = url.includes(commonPrefix)
      ? url.split(commonPrefix)[1].split("/").slice(1, 2).join("/")
      : url.split("/").slice(1, 3).join("/");
    qualified = replaceSpecialChars(name);
  }
  qualified = wordToUpperCase(qualified);

  controllerNameObj[initialName] = qualified;
  return qualified;
};

export { getControllerName };
