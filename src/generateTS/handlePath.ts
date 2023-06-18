import { Api } from "../typings";
import { schemaToType } from "./schemaToType";

/** 是否存在路由传参, 存在则处理url */
const handlePath = (api: Api, importType: Set<string>) => {
  if (!api.path?.length) return;

  const propList = api.path.map(item => {
    api.url = api.url.replace(`{${item.name}}`, `\${path.${item.name}}`);
    return `${item.name}: ${schemaToType(item.schema, importType)}`;
  });
  return `path: {${propList.join(", ")}}`;
};

export { handlePath };
