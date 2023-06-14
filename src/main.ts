import {
  // formatEntityEnum,
  transType,
  // createApiJS
} from "./formatData/index";
import { outputFile } from "./outputFile/index";
import { getInitData } from "./utils/request";
import { Desc } from "./utils/index";
import { useInquirer } from "./utils/inquirer";
import { getConfig } from "./utils/config";
import ejs from "ejs";
import { resolve } from "path";
import { collectAPI } from "./collect";
import { generateAPI_TS } from "./generate/generateAPI_TS";
import { getDto } from "./collect/dto";
import { OpenAPIObject } from "openapi3-ts/oas31";

export const main = async () => {
  // 获取配置文件
  const { service, importAxios, useAxios, outputDir, outputType, definition, indexable, enumMode, commonPrefix, multipleFiles } =
    await getConfig();

  // 命令行交互
  const { url, fileSuffix, serviceName } = await useInquirer(service, outputType);

  // 获取 swagger/openapi 的json文件
  const { paths, components, tags }: OpenAPIObject = await getInitData(url);

  // 格式化api信息
  // const apiTagInfo = formatApi(data.paths, data.tags, commonPrefix);
  const apiMap = collectAPI(paths, tags, commonPrefix);

  // 根据类型创建模板生成对应文件
  if (fileSuffix === "ts") {
    const indexableTemplate = indexable ? "[key: string]: any" : "";

    // const { entityInfoList, enumInfoList, entityNameList, enumNameList } = formatEntityEnum(components?.schemas ?? {});
    const { interfaceList, interfaceNameList, enumList, enumNameList } = getDto(components.schemas);
    const dtoNameList = [...interfaceNameList, ...enumNameList];
    const { controllerList, importAllType } = generateAPI_TS(apiMap, { commonPrefix, multipleFiles, dtoNameList });

    const templateEntity = await ejsRender("./template/typeScript/typings.d.ejs", {
      definition,
      enumMode,
      indexableTemplate,
      entityInfoList: interfaceList,
      enumInfoList: enumList,
      Desc,
      transType,
    });
    if (multipleFiles) {
      controllerList.forEach(async ({ description, controllerName, funcList, importType }) => {
        const templateApi = await ejsRender("./template/typeScript/apiFiles.ejs", {
          desc: description,
          funcList,
          importEntityName: importType,
          importAxios,
          useAxios,
        });
        outputFile(outputDir, `${serviceName}/${controllerName}.${fileSuffix}`, templateApi);
      });
    } else {
      const templateApi = await ejsRender("./template/typeScript/api.ejs", {
        controllerList,
        importEntityName: importAllType,
        importAxios,
        useAxios,
      });
      outputFile(outputDir, `${serviceName}/api.${fileSuffix}`, templateApi);
    }
    outputFile(outputDir, `${serviceName}/typings.d.${fileSuffix}`, templateEntity);
  } else {
    // const { apiList } = createApiJS(apiMap);
    // if (multipleFiles) {
    //   apiList.forEach(async ({ desc, tagName, funcList }) => {
    //     const templateApi = await ejsRender("./template/javaScript/apiFiles.ejs", {
    //       desc,
    //       funcList,
    //       importAxios,
    //       useAxios,
    //     });
    //     outputFile(outputDir, `${serviceName}/${tagName}.${fileSuffix}`, templateApi);
    //   });
    // } else {
    //   const templateApi = await ejsRender("./template/javaScript/api.ejs", { apiList, importAxios, useAxios });
    //   outputFile(outputDir, `${serviceName}/api.${fileSuffix}`, templateApi);
    // }
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
