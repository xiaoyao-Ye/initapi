import { it, expect, describe } from "vitest";
import { getRequestBody } from "./body";
import { ReferenceObject, RequestBodyObject } from "openapi3-ts/oas31";

describe("Get request body", () => {
  it("Should return 'FormData' type", () => {
    const requestBody: ReferenceObject | RequestBodyObject = {
      content: {
        "multipart/form-data": {
          schema: {
            required: ["file"],
            type: "object",
            properties: {
              file: {
                type: "string",
                format: "binary",
              },
            },
          },
          encoding: {
            file: {
              style: "form",
            },
          },
        },
      },
    };
    const result = "FormData";

    expect(getRequestBody(requestBody)).toEqual(result);
  });

  it("Should return 'Schema' type", () => {
    const requestBody: ReferenceObject | RequestBodyObject = {
      description: "",
      content: {
        "application/json-patch+json": {
          schema: {
            $ref: "#/components/schemas/IDCardOCRRequest",
          },
        },
        "application/json": {
          schema: {
            $ref: "#/components/schemas/IDCardOCRRequest",
          },
        },
        "text/json": {
          schema: {
            $ref: "#/components/schemas/IDCardOCRRequest",
          },
        },
        "application/*+json": {
          schema: {
            $ref: "#/components/schemas/IDCardOCRRequest",
          },
        },
      },
    };
    const result = { $ref: "#/components/schemas/IDCardOCRRequest" };

    expect(getRequestBody(requestBody)).toEqual(result);
  });
});
