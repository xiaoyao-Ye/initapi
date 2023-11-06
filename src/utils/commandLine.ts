import { cancel, isCancel, select } from "@clack/prompts";
import { Indexable } from "../typings";
import { consola } from "consola";

type Swagger = Indexable<{ url: string; commonPrefix?: string }>;

type Response = Promise<{
  fileSuffix: string;
  url: string;
  serviceName: string;
  commonPrefix: string;
}>;

function cancelOperation() {
  cancel("Operation cancelled.");
  process.exit(0);
}

const useCommandLine = async (swagger: Swagger, outputType: string | symbol = ""): Response => {
  const serviceNameList = Object.entries(swagger);
  let serviceName: string;
  if (serviceNameList.length === 1) {
    serviceName = serviceNameList[0][0];
    consola.info(` Selected ${serviceName} API documentation json address!`);
  } else {
    serviceName = (await select({
      // message: "请选择 API 文档json地址:",
      message: "Please select the API documentation json address:",
      options: serviceNameList.map(([name, { url }]) => ({ value: name, label: name, hint: url })),
    })) as string;
    if (isCancel(serviceName)) cancelOperation();
  }

  if (!outputType) {
    outputType = await select({
      // message: "请选择需要生成的 API 类型:",
      message: "Please select the type of API to generate:",
      options: [
        {
          value: "ts",
          label: "TypeScript",
          hint: "The ts file for the API interface and the corresponding type of the interface will be generated.",
        },
        { value: "js", label: "JavaScript", hint: "Generate API interface files only" },
        // { value: "ts", label: "TypeScript", hint: "将会生成API接口的ts文件以及接口对应的类型" },
        // { value: "js", label: "JavaScript", hint: "仅生成API接口文件" },
      ],
    });
    if (isCancel(outputType)) cancelOperation();
  }

  const url = swagger[serviceName].url;
  const commonPrefix = swagger[serviceName].commonPrefix;
  const FILE_TYPE = { TypeScript: "ts", JavaScript: "js" };
  const fileSuffix = FILE_TYPE[outputType] ?? outputType;

  return { fileSuffix, serviceName, url, commonPrefix };
};

export { useCommandLine };
