import { InterfaceProp, Schema, isReferenceObject } from "../typings";
import { replaceSpecialChars, wordToUpperCase } from "../utils";

const interfaceToType = (schema: Schema | InterfaceProp): string => {
  if (isReferenceObject(schema)) {
    const dto_name = wordToUpperCase(replaceSpecialChars(schema.$ref?.split("/").pop()));
    return dto_name;
  }

  if (Array.isArray(schema.type)) return;

  if (schema.enum) {
    return `"${schema.enum.join('" | "')}"`;
  } else if (schema.type === "string" || schema.type === "boolean") {
    return schema.type;
  } else if (["integer", "long", "float", "double", "number", "int", "int32", "int64"].includes(schema.type)) {
    return "number";
  } else if (schema.type === "array") {
    return `Array<${interfaceToType(schema.items)}>`;
  } else if ("propList" in schema && schema.propList.length > 0) {
    const obj = {};
    schema.propList.forEach(prop => (obj[prop.name] = interfaceToType(prop)));
    return JSON.stringify(obj).replace(/"/g, "");
  } else if (schema.type === "object") {
    if (!schema.additionalProperties || typeof schema.additionalProperties === "boolean") return "Record<string, any>";
    return `Record<string, ${interfaceToType(schema.additionalProperties)}>`;
  } else {
    return "any";
  }
};

export { interfaceToType };
