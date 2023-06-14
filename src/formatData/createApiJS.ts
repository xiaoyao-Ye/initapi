import { Indexable } from "../type";
import { Desc, getFuncNameByOpenApi, toCamelCase, toLowerCaseFirst } from "../utils";

export const createApiJS = (apiTagInfo: { [className: string]: { desc: string; tagInfo: any[] } }) => {
  let apiList = [];

  for (const [tagName, { desc, tagInfo }] of Object.entries(apiTagInfo)) {
    // for (const tagName in apiTagInfo) {
    let nameRepeat: Indexable = {};
    const funcList = tagInfo.map(apiInfo => {
      // 后端没有返回正确函数名称的时候, 根据url生成
      // let funcName = apiInfo.funcName ? toLowerCaseFirst(apiInfo.funcName) : getFuncName(apiInfo.url, tagName)
      let funcName = apiInfo.funcName
        ? toLowerCaseFirst(apiInfo.funcName)
        : getFuncNameByOpenApi(apiInfo.url, tagName, apiInfo.mode);
      funcName = toCamelCase(funcName);
      handleRepeatName(funcName, nameRepeat);

      const withPath = hasHandlePath(apiInfo);
      const withParams = hasHandleParams(apiInfo);
      const withData = hasHandleData(apiInfo);

      const mode = apiInfo.mode.toUpperCase();
      const desc = Desc(`${apiInfo.summary}${apiInfo.desc ? "-" + apiInfo.desc : ""}`);
      const args = [withPath && "path", withParams && "params", withData && "data"].filter(f => f).join(", ");
      const req = [withParams && "params", withData && "data"]
        .filter(f => f)
        .map(e => `${e.split(":")[0]}: ${e.split(":")[0]},`)
        .join("\n  ");

      // return apiTemplateStatic({ use: useAxios, url: apiInfo.url, method: mode, funcName, desc, args, req })
      return { url: apiInfo.url, method: mode, funcName, desc, args, req };
    });

    apiList.push({ tagName, desc: Desc(desc), funcList });
  }

  return { apiList };
};

/** 根据url生成的函数名称可能存在重复的情况, 防止api.ts报错, 重复名称统一处理成 `_[fnName]_[repeatCount]` */
const handleRepeatName = (funcName: string, nameRepeat: Indexable) => {
  if (nameRepeat[funcName]) {
    funcName = `_${funcName}_${nameRepeat[funcName]++}`;
  } else {
    nameRepeat[funcName] = 1;
  }
};

/** 是否存在路由传参, 存在则处理url */
const hasHandlePath = (apiInfo: any): boolean => {
  if (!apiInfo.path?.length) return false;
  apiInfo.path.forEach(item => {
    apiInfo.url = apiInfo.url.replace(`{${item.name}}`, `\${path.${item.name}}`);
  });
  return true;
};

/** 是否存在params传参 */
const hasHandleParams = (apiInfo: any) => {
  return apiInfo.params?.length ? true : false;
};

/** 是否存在data传参 */
const hasHandleData = (apiInfo: any) => {
  return Object.keys(apiInfo.data ?? {}).length ? true : false;
};
