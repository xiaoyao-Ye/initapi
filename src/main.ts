import { formatEntityEnum, createApiTS, transType, createApiJS } from "./formatData/index";
import { outputFile } from "./outputFile/index";
import { getInitData } from "./utils/request";
import { Desc } from "./utils/index";
import { useInquirer } from "./utils/inquirer";
import { getConfig } from "./utils/config";
import ejs from "ejs";
import { resolve } from "path";
import { collectAPI } from "./collect";

export const main = async () => {
  // 获取配置文件
  const { service, importAxios, useAxios, outputDir, outputType, definition, indexable, enumMode, commonPrefix, multipleFiles } =
    await getConfig();

  // 命令行交互
  const { url, fileSuffix, serviceName } = await useInquirer(service, outputType);

  // 获取 swagger/openapi 的json文件
  const { paths, components, tags } = await getInitData(url);

  // 格式化api信息
  // const apiTagInfo = formatApi(data.paths, data.tags, commonPrefix);
  const apiMap = collectAPI(paths, tags, commonPrefix);

  // 根据类型创建模板生成对应文件
  if (fileSuffix === "ts") {
    const indexableTemplate = indexable ? "[key: string]: any" : "";
    const { entityInfoList, enumInfoList, entityNameList, enumNameList } = formatEntityEnum(components?.schemas ?? {});
    const { apiList, importEntityName } = createApiTS(apiMap, [...entityNameList, ...enumNameList], multipleFiles);

    const templateEntity = await ejsRender("./template/typeScript/typings.d.ejs", {
      definition,
      enumMode,
      indexableTemplate,
      entityInfoList,
      enumInfoList,
      Desc,
      transType,
    });
    if (multipleFiles) {
      apiList.forEach(async ({ desc, tagName, funcList, importNameList }) => {
        const templateApi = await ejsRender("./template/typeScript/apiFiles.ejs", {
          desc,
          funcList,
          importEntityName: [...importNameList].join(", "),
          importAxios,
          useAxios,
        });
        outputFile(outputDir, `${serviceName}/${tagName}.${fileSuffix}`, templateApi);
      });
    } else {
      const templateApi = await ejsRender("./template/typeScript/api.ejs", {
        apiList,
        importEntityName: importEntityName.join(", "),
        importAxios,
        useAxios,
      });
      outputFile(outputDir, `${serviceName}/api.${fileSuffix}`, templateApi);
    }
    outputFile(outputDir, `${serviceName}/typings.d.${fileSuffix}`, templateEntity);
  } else {
    const { apiList } = createApiJS(apiMap);
    if (multipleFiles) {
      apiList.forEach(async ({ desc, tagName, funcList }) => {
        const templateApi = await ejsRender("./template/javaScript/apiFiles.ejs", {
          desc,
          funcList,
          importAxios,
          useAxios,
        });
        outputFile(outputDir, `${serviceName}/${tagName}.${fileSuffix}`, templateApi);
      });
    } else {
      const templateApi = await ejsRender("./template/javaScript/api.ejs", { apiList, importAxios, useAxios });
      outputFile(outputDir, `${serviceName}/api.${fileSuffix}`, templateApi);
    }
  }
};

const ejsRender = (template: string, data: any): Promise<string> => {
  template = resolve(__dirname, template);
  return new Promise((resolve, reject) => {
    ejs.renderFile(template, data, (err, str) => {
      if (err) {
        reject(err);
      }
      resolve(str);
    });
  });
};
