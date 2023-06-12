import { Data } from "../type";
import { schemaToType } from "./schemaToType";

/** 是否存在data传参 */
const handleData = (data: Data, importType: Set<string>) => {
  if (!Object.keys(data ?? {}).length) return;

  if (data === "FormData") return `data?: ${data}`;

  return `data?: ${schemaToType(data, importType)}`;
};

export { handleData };
