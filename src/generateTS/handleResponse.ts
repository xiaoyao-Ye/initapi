import { Schema } from "../typings";
import { schemaToType } from "./schemaToType";

/** api的返回类型 */
const handleResponse = (response: Schema | Record<string, unknown> = {}, importType: Set<string>) => {
  if (!Object.keys(response).length) return "void";
  return schemaToType(response, importType);
};

export { handleResponse };
