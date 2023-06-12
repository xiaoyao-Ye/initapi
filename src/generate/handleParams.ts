import { Parameters } from "../type";
import { schemaToType } from "./schemaToType";

/** 是否存在params传参 */
const handleParams = (params: Parameters[] = [], importType: Set<string>) => {
  if (!params.length) return;
  const propList = params.map(q => `${q.name}?: ${schemaToType(q.schema, importType)}`);
  return `params?: {${propList.join(", ")}}`;
};

export { handleParams };
