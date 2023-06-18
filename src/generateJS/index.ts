import { Api, ApiMap, Data, Parameters } from "../typings";
import { getFuncName, replaceSpecialChars, transformString, useDescription } from "../utils";

type Options = {
  commonPrefix?: string;
};

type ControllerInfo = {
  controllerName: string;
  description: string;
  funcList: {
    url: string;
    fnName: string;
    fnDescription: string;
    fnArgs: string;
    fnMethod: string;
    fnRequestBody: string;
  }[];
};

const handleData = (data: Data) => {
  if (!Object.keys(data ?? {}).length) return;
  return "data";
};

const handleParams = (params: Parameters[] = []) => {
  if (!params.length) return;
  return "params";
};

const handlePath = (api: Api) => {
  if (!api.path?.length) return;
  api.path.forEach(item => (api.url = api.url.replace(`{${item.name}}`, `\${path.${item.name}}`)));
  return "path";
};

const generateAPI_JS = (apiMap: ApiMap, options: Options) => {
  const { commonPrefix } = options;

  const controllerList: ControllerInfo[] = [];

  for (let [controllerName, { description, apiList }] of Object.entries(apiMap)) {
    const nameRepeat: Record<string, number> = {};

    const funcList = apiList.map(api => {
      const { name, url, summary, description, method, params, data } = api;

      const hasPath = handlePath(api);
      const hasParams = handleParams(params);
      const hasData = handleData(data);

      let fnName = name || getFuncName(url, controllerName, commonPrefix, method, nameRepeat);
      fnName = transformString(replaceSpecialChars(fnName));
      const fnDescription = useDescription(`${summary ?? ""}${description ? "-" + description : ""}`);
      const fnMethod = method.toUpperCase();
      const fnArgs = [hasPath, hasParams, hasData].filter(f => f).join(", ");
      const fnRequestBody = [hasParams, hasData].filter(f => f).join(",\n ");

      return { url: api.url, fnName, fnDescription, fnArgs, fnMethod, fnRequestBody };
    });

    description = useDescription(description);

    const controllerInfo: ControllerInfo = { controllerName, description, funcList };
    controllerList.push(controllerInfo);
  }

  return { controllerList };
};

export { generateAPI_JS };
