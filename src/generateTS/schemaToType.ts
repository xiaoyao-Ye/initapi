import { Schema, isReferenceObject } from "../typings";
import { replaceSpecialChars, wordToUpperCase } from "../utils";

const schemaToType = (schema: Schema = {}, importType?: Set<string>): string => {
  if (isReferenceObject(schema)) {
    const dto_name = wordToUpperCase(replaceSpecialChars(schema.$ref?.split("/").pop()));
    importType?.add(dto_name);
    return dto_name;
  }

  if (Array.isArray(schema.type)) return;

  if (schema.type === "string" || schema.type === "boolean") {
    return schema.type;
  } else if (["integer", "long", "float", "double", "number", "int", "int32", "int64"].includes(schema.type)) {
    return "number";
  } else if (schema.type === "array") {
    return `Array<${schemaToType(schema.items, importType)}>`;
  } else if (schema.type === "object") {
    if (!schema.additionalProperties || typeof schema.additionalProperties === "boolean") return "Record<string, any>";
    return `Record<string, ${schemaToType(schema.additionalProperties, importType)}>`;
  } else {
    return "any";
  }
};

export { schemaToType };
