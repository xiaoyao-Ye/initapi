import { select } from "@clack/prompts";
import { Indexable } from "../typings";

type Swagger = Indexable<{ url: string; commonPrefix?: string }>;

type Response = Promise<{
  fileSuffix: string;
  url: string;
  serviceName: string;
  commonPrefix: string;
}>;

const useCommandLine = async (swagger: Swagger, outputType: string | symbol = ""): Response => {
  const serviceNameList = Object.entries(swagger);

  const serviceName = (await select({
    message: "请选择 API 文档json地址:",
    options: serviceNameList.map(([name, { url }]) => ({ value: name, label: name, hint: url })),
  })) as string;

  if (!outputType) {
    outputType = await select({
      message: "请选择您需要生成的 API 类型:",
      options: [
        { value: "ts", label: "TypeScript", hint: "将会生成API接口的ts文件以及接口对应的类型" },
        { value: "js", label: "JavaScript", hint: "仅生成API接口文件" },
      ],
    });
  }

  const url = swagger[serviceName].url;
  const commonPrefix = swagger[serviceName].commonPrefix;
  const FILE_TYPE = { TypeScript: "ts", JavaScript: "js" };
  const fileSuffix = FILE_TYPE[outputType] ?? outputType;

  return { fileSuffix, serviceName, url, commonPrefix };
};

export { useCommandLine };
