import { ApiMap } from "../typings";
import { getFuncName, replaceSpecialChars, transformString, useDescription } from "../utils";
import { handleData } from "./handleData";
import { handleParams } from "./handleParams";
import { handlePath } from "./handlePath";
import { handleResponse } from "./handleResponse";

interface Options {
  dtoNameList: string[];
  commonPrefix?: string;
  multipleFiles?: boolean;
}

interface ControllerInfo {
  controllerName: string;
  description: string;
  funcList: FunctionInfo[];
  importType: string;
}

interface FunctionInfo {
  url: string;
  fnName: string;
  fnDescription: string;
  fnArgs: string;
  fnMethod: string;
  fnRequestBody: string;
  fnResponse: string;
}

const generateAPI_TS = (apiMap: ApiMap, options: Options) => {
  const { dtoNameList, commonPrefix, multipleFiles } = options;

  const controllerList: ControllerInfo[] = [];
  const importAllType = new Set<string>();

  for (let [controllerName, { description, apiList }] of Object.entries(apiMap)) {
    const nameRepeat: Record<string, number> = {};
    const importType = new Set<string>();

    const funcList: FunctionInfo[] = apiList.map(api => {
      const { name, url, summary, description, method, params, data, response } = api;

      const hasPath = handlePath(api, importType);
      const hasParams = handleParams(params, importType);
      const hasData = handleData(data, importType);
      let fnName = name || getFuncName(url, controllerName, commonPrefix, method, nameRepeat);
      fnName = transformString(replaceSpecialChars(fnName));
      const fnDescription = useDescription(`${summary ?? ""}${description ? "-" + description : ""}`);
      const fnResponse = handleResponse(response, importType);
      const fnMethod = method.toUpperCase();
      const fnArgs = [hasPath, hasParams, hasData].filter(f => f).join(", ");
      const fnRequestBody = [hasParams && "params,", hasData && "data,"].filter(f => f).join("\n ");

      return { url: api.url, fnName, fnDescription, fnArgs, fnMethod, fnRequestBody, fnResponse };
    });

    controllerName = dtoNameList.includes(controllerName) ? `${controllerName}Api` : controllerName;
    description = useDescription(description);

    const controllerInfo: ControllerInfo = { controllerName, description, funcList, importType: "" };
    if (multipleFiles) controllerInfo.importType = [...importType].join(", ");
    else importType.forEach(name => importAllType.add(name));
    controllerList.push(controllerInfo);
  }

  return { controllerList, importAllType: [...importAllType].join(", ") };
};

export { generateAPI_TS };
