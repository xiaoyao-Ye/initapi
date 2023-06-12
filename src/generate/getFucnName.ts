/** 替换字符串中的 /{*} 为 '' */
const replacePath = (path: string): string => {
  return path.replace(/\/\{[^{}]*\}/g, "");
};

/**
 * 根据url获取函数名
 * 默认情况移除url中的{}符号, 移除commonPrefix, 然后将剩余的url按照'/'分割, 移除controller name, 取接下来的所有单词一起作为函数名
 * 如果出现重复, 则在函数名前面加上http method
 */
const getFuncName = (url: string, commonPrefix: string, method: string, nameRepeat: Record<string, number>): string => {
  url = replacePath(url);
  if (url.includes(commonPrefix)) url = url.replace(commonPrefix, "");
  const pathSlice = url.split("/");
  let nameSlice = pathSlice.slice(2).length === 0 ? pathSlice.slice(0) : pathSlice.slice(2);
  const name = nameSlice.map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join("");

  if (nameRepeat[name]) {
    nameRepeat[name]++;
    return `${method.toLowerCase()}_${name}`;
  } else {
    nameRepeat[name] = 1;
    return name;
  }
};

export { getFuncName };
