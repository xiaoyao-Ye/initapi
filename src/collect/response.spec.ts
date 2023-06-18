import { it, expect, describe } from "vitest";
import { getResponses } from "./response";
import { ResponsesObject } from "openapi3-ts/oas31";

describe("Get responses", () => {
  it("Should return ReferenceObject type", () => {
    /** 目前发现 swagger 2.0 文档转换成 openapi 3 会出现如下返回结构, 此结构不在已知类型内 */
    // const responses: ResponsesObject = {
    //   "200": {
    //     description: "OK",
    //     schema: {
    //       $ref: "#/definitions/HttpResult«PageInfoRsp«BarTableListItemDTO»»",
    //       originalRef: "HttpResult«PageInfoRsp«BarTableListItemDTO»»",
    //     },
    //   },
    //   "401": {
    //     description: "Unauthorized",
    //   },
    //   "403": {
    //     description: "Forbidden",
    //   },
    //   "404": {
    //     description: "Not Found",
    //   },
    // };

    /** 正常返回结构 */
    const responses: ResponsesObject = {
      "200": {
        description: "Success",
        content: {
          "text/plain": {
            schema: {
              $ref: "#/components/schemas/AdminResult_VehicleLicenseIdentifyOutPutDto",
            },
          },
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AdminResult_VehicleLicenseIdentifyOutPutDto",
            },
          },
          "text/json": {
            schema: {
              $ref: "#/components/schemas/AdminResult_VehicleLicenseIdentifyOutPutDto",
            },
          },
        },
      },
    };
    const result = { $ref: "#/components/schemas/AdminResult_VehicleLicenseIdentifyOutPutDto" };

    expect(getResponses(responses)).toEqual(result);
  });
});
