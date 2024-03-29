import { outputFile } from "./outputFile/index";
import { getInitData } from "./utils/request";
import { getConfig } from "./utils/config";
import { collectAPI } from "./collect";
import { generateAPI_TS } from "./generateTS";
import { collectDto } from "./collect/dto";
import { OpenAPIObject } from "openapi3-ts/oas31";
import { generateDTO } from "./generateDTO";
import { ejsRender } from "./outputFile/render";
import { resolve } from "path";
import { generateAPI_JS } from "./generateJS";
import { getCommonPrefix } from "./utils";
import { useCommandLine } from "./utils/commandLine";
import { intro, outro, spinner, note } from "@clack/prompts";
import { getPrettierOptions } from "./outputFile/prettier";
import chalk from "chalk";

const Spinner = spinner();

export const main = async () => {
  intro(`Generate API start:`);

  const { service, importRequest, useRequest, outputDir, outputType, definition, indexable, enumMode, multipleFiles } =
    await getConfig();

  let { url, fileSuffix, serviceName, commonPrefix } = await useCommandLine(service, outputType);

  // Spinner.start("正在获取API数据...");
  Spinner.start("Getting API data...");
  const { paths, components, tags }: OpenAPIObject = await getInitData(url);
  // Spinner.stop(chalk.gray("获取API数据成功."));
  Spinner.stop(chalk.gray("Get API data successfully."));

  // Spinner.start("正在处理API数据...");
  Spinner.start("Processing API data...");
  if (!commonPrefix) commonPrefix = getCommonPrefix(Object.keys(paths));
  const apiMap = collectAPI(paths, tags, commonPrefix);
  // Spinner.stop(chalk.gray("处理API数据成功."));
  Spinner.stop(chalk.gray("Processing API data successfully."));

  // Spinner.start("正在生成API文件...");
  Spinner.start("Generating API files...");

  const prettierOptions = await getPrettierOptions();

  if (fileSuffix === "ts") {
    const indexableTemplate = indexable ? "[key: string]: any" : "";

    const { interfaceList, interfaceNameList, enumList, enumNameList } = collectDto(components.schemas);
    const { generateEnumList, generateInterfaceList } = generateDTO(enumList, interfaceList);
    const dtoNameList = [...interfaceNameList, ...enumNameList];
    const { controllerList, importAllType } = generateAPI_TS(apiMap, { commonPrefix, multipleFiles, dtoNameList });

    const filePath = `${serviceName}/typings.d.${fileSuffix}`;
    const renderOptionsType = { definition, enumMode, indexableTemplate, generateInterfaceList, generateEnumList };
    const ejs_template = resolve(__dirname, "./template/typeScript/typings.d.ejs");
    const template_typings = await ejsRender(ejs_template, renderOptionsType);
    outputFile(outputDir, filePath, template_typings, prettierOptions);

    if (multipleFiles) {
      controllerList.forEach(async ({ description, controllerName, funcList, importType }) => {
        const filePath = `${serviceName}/${controllerName}.${fileSuffix}`;
        const renderOptionsApi = { description, funcList, importType, importRequest, useRequest };
        const ejs_template = resolve(__dirname, "./template/typeScript/apiFiles.ejs");
        const template_API = await ejsRender(ejs_template, renderOptionsApi);
        outputFile(outputDir, filePath, template_API, prettierOptions);
      });
    } else {
      const filePath = `${serviceName}/api.${fileSuffix}`;
      const renderOptionsApi = { controllerList, importAllType, importRequest, useRequest };
      const ejs_template = resolve(__dirname, "./template/typeScript/api.ejs");
      const template_Api = await ejsRender(ejs_template, renderOptionsApi);
      outputFile(outputDir, filePath, template_Api, prettierOptions);
    }
  } else {
    const { controllerList } = generateAPI_JS(apiMap, { commonPrefix });
    if (multipleFiles) {
      controllerList.forEach(async ({ description, controllerName, funcList }) => {
        const filePath = `${serviceName}/${controllerName}.${fileSuffix}`;
        const renderOptionsApi = { description, funcList, importRequest, useRequest };
        const ejs_template = resolve(__dirname, "./template/javaScript/apiFiles.ejs");
        const template_Api = await ejsRender(ejs_template, renderOptionsApi);
        outputFile(outputDir, filePath, template_Api, prettierOptions);
      });
    } else {
      const filePath = `${serviceName}/api.${fileSuffix}`;
      const renderOptionsApi = { controllerList, importRequest, useRequest };
      const ejs_template = resolve(__dirname, "./template/javaScript/api.ejs");
      const template_Api = await ejsRender(ejs_template, renderOptionsApi);
      outputFile(outputDir, filePath, template_Api, prettierOptions);
    }
  }

  // Spinner.stop(chalk.gray("生成API文件成功."));
  Spinner.stop(chalk.gray("Generate API file successfully."));
  note(chalk.yellowBright(`Go to ${outputDir}/${serviceName} path to view`), "Next steps.");
  outro(chalk.yellowBright(`Generate API successfully!`));
};
