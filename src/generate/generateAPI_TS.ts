import { ApiMap } from "../type";

const generateAPI_TS = (apiMap: ApiMap, options: any) => {
  for (let [controllerName, { description, apiList }] of Object.entries(apiMap)) {
    console.log(controllerName, description, apiList);
    const funcList = apiList.map(api => {
      const { name, summary, description, method, path, params, data, response } = api;

      return {};
    });
  }
};

export { generateAPI_TS };
