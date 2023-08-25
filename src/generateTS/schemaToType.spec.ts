import { it, expect, describe } from "vitest";
import { schemaToType } from "./schemaToType";
import { Schema } from "../typings";

describe("schema to type", () => {
  it("should return the dto name", () => {
    const schema = { $ref: "#/components/schemas/AdvertisementParam" };

    const res = schemaToType(schema);

    expect(res).toBe("AdvertisementParam");
  });

  it("should return the dto name and collect the importType", () => {
    const schema = { $ref: "#/components/schemas/AdvertisementParam" };
    const importTypes: Set<string> = new Set();

    schemaToType(schema, importTypes);

    expect(importTypes.has("AdvertisementParam")).toBe(true);
  });

  it("should return undefined", () => {
    const schema = { type: [] };

    const res = schemaToType(schema);

    expect(res).toBe(undefined);
  });

  // it("should return type", () => {
  //   expect(schemaToType({ type: "null" })).toBe("any");
  //   expect(schemaToType({ type: "string" })).toBe("string");
  //   expect(schemaToType({ type: "boolean" })).toBe("boolean");
  //   expect(schemaToType({ type: "number" })).toBe("number");
  //   expect(schemaToType({ type: "integer" })).toBe("number");

  //   const arr: Schema = { type: "array", items: { type: "string" } };
  //   expect(schemaToType(arr)).toBe("Array<string>");

  //   const arrRef: Schema = { type: "array", items: { $ref: "#/components/schemas/AdvertisementParam" } };
  //   expect(schemaToType(arrRef)).toBe("Array<AdvertisementParam>");

  //   const obj: Schema = { type: "object" };
  //   expect(schemaToType(obj)).toBe("Record<string, any>");

  //   const objRef: Schema = { type: "object", additionalProperties: { $ref: "#/components/schemas/AdvertisementParam" } };
  //   expect(schemaToType(objRef)).toBe("Record<string, AdvertisementParam>");

  //   const objStr: Schema = { type: "object", additionalProperties: { type: "string" } };
  //   expect(schemaToType(objStr)).toBe("Record<string, string>");
  // });

  it.each([
    [{ type: "null" }, "any"],
    [{ type: "string" }, "string"],
    [{ type: "boolean" }, "boolean"],
    [{ type: "number" }, "number"],
    [{ type: "integer" }, "number"],
    [{ type: "array", items: { type: "string" } }, "Array<string>"],
    [{ type: "array", items: { $ref: "#/components/schemas/AdvertisementParam" } }, "Array<AdvertisementParam>"],
    [{ type: "object" }, "Record<string, any>"],
    [
      { type: "object", additionalProperties: { $ref: "#/components/schemas/AdvertisementParam" } },
      "Record<string, AdvertisementParam>",
    ],
    [{ type: "object", additionalProperties: { type: "string" } }, "Record<string, string>"],
  ])("schemaToType(%s) should return %s", (schema, expected) => {
    expect(schemaToType(schema as Schema)).toBe(expected);
  });
});
