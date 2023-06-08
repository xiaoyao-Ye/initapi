/** 判断是否需要收集当前 PATH_ITEM 信息 */
const isNeedCollect = (method: string) => {
  const methodsUpper = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
  const methodsLower = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];
  return methodsUpper.includes(method) || methodsLower.includes(method);
};

/** 判断对象是否为空 */
const isEmpty = (obj: any = {}) => {
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  return false;
};

/**
 * 匹配所有非中文、数字、字母和下划线的字符
 * @param str
 * @returns 将匹配到的字符替换为下划线
 */
const replaceSpecialChars = (str: string): string => {
  const regex = /[^\u4e00-\u9fa5\w]/g;
  return str.replace(regex, "_");
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

/** 将首字母以及下划线后的字母大写 */
const wordToUpperCase = (str: string) => {
  return str
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export { isNeedCollect, replaceSpecialChars, getCommonPrefix, isEmpty, wordToUpperCase };
