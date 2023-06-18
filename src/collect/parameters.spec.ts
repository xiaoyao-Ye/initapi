import { it, expect, describe } from "vitest";
import { getParameters } from "./parameters";
import { ParameterObject, ReferenceObject } from "openapi3-ts/oas31";

describe("Get parameters", () => {
  it("Should return path and params", () => {
    /** 目前发现 swagger 2.0 文档转换成 openapi 3 会出现如下返回结构, 此结构不在已知类型内 */
    // const parameters: (ParameterObject | ReferenceObject)[] = [
    //   {
    // parameters 理论上不存在in为body的情况
    //     in: "body",
    //     name: "cmd",
    //     description: "cmd",
    //     required: true,
    //     schema: {
    //       $ref: "#/definitions/银台余额卡代充值对象",
    //       originalRef: "银台余额卡代充值对象",
    //     },
    //   },
    // ];
    const parameters: ((ParameterObject & { type?: string; format?: string }) | ReferenceObject)[] = [
      {
        name: "userId",
        in: "query",
        description: "userId",
        required: true,
        type: "integer",
        format: "int64",
      },
      {
        name: "memberId",
        in: "path",
        description: "粉丝ID",
        required: true,
        type: "string",
      },
      {
        name: "isCallBack",
        in: "query",
        schema: {
          type: "boolean",
        },
      },
      {
        $ref: "#/components/parameters/Member",
        summary: "会员信息",
        description: "所有会员的信息",
      },
    ];

    const result = {
      path: [
        {
          name: "memberId",
          description: "粉丝ID",
          schema: { type: "string" },
        },
      ],
      params: [
        {
          name: "userId",
          description: "userId",
          schema: { type: "integer" },
        },
        {
          name: "isCallBack",
          description: "",
          schema: { type: "boolean" },
        },
      ],
    };

    expect(getParameters(parameters)).toEqual(result);
  });
});
