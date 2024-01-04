/**
 * TODO:
 * 数字枚举
 * 英文枚举
 */

import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

export const mock_collect_input: { [schema: string]: SchemaObject | ReferenceObject } = {
  /** 枚举 */
  IdentityType: { type: "string", enum: ["邮箱", "微信"] },
  Category: { type: "string", enum: ["收入", "支出"] },
  /** DTO */
  WeChatSignInDto: {
    type: "object",
    properties: {
      id: { type: "integer", format: "int64" },
      identity_type: { description: "身份类型", $ref: "#/components/schemas/IdentityType" },
      nickName: { type: "string", description: "昵称", nullable: true },
      avatar: { type: "string", description: "头像", nullable: true },
      gender: { type: "string", description: "性别", nullable: true },
      code: { type: "string", description: "微信用户登录凭证" },
    },
    required: ["identity_type", "code"],
  },
  /** DTO-2 */
  TagItemsVo: {
    type: "object",
    properties: {
      id: { type: "number", description: "id" },
      created_at: { format: "date-time", type: "string", description: "创建时间" },
      updated_at: { format: "date-time", type: "string", description: "更新时间" },
      deleted_at: { format: "date-time", type: "string", description: "软删除时间" },
      category: { enum: ["收入", "支出"], type: "string", description: "收支类型" },
      name: { type: "string", description: "标签名" },
      sign: { type: "string", description: "标签符号" },
    },
  },
  /** DTO-3 */
  QueryBillsVo: {
    type: "object",
    properties: {
      items: { description: "列表", type: "array", items: { $ref: "#/components/schemas/BillItemsVo" } },
      total: { type: "number", description: "总数量" },
    },
  },
};

export const mock_collect_output = [
  {
    name: "WeChatSignInDto",
    description: undefined,
    propList: [
      {
        name: "id",
        description: undefined,
        type: "integer",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "identity_type",
        description: "身份类型",
        $ref: "#/components/schemas/IdentityType",
        required: true,
      },
      {
        name: "nickName",
        description: "昵称",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "avatar",
        description: "头像",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "gender",
        description: "性别",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "code",
        description: "微信用户登录凭证",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: true,
      },
    ],
  },
  {
    name: "TagItemsVo",
    description: undefined,
    propList: [
      {
        name: "id",
        description: "id",
        type: "number",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "created_at",
        description: "创建时间",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "updated_at",
        description: "更新时间",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "deleted_at",
        description: "软删除时间",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "category",
        description: "收支类型",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
        enum: ["收入", "支出"],
      },
      {
        name: "name",
        description: "标签名",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "sign",
        description: "标签符号",
        type: "string",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
    ],
  },
  {
    name: "QueryBillsVo",
    description: undefined,
    propList: [
      {
        name: "items",
        description: "列表",
        type: "array",
        items: { $ref: "#/components/schemas/BillItemsVo" },
        additionalProperties: undefined,
        required: false,
      },
      {
        name: "total",
        description: "总数量",
        type: "number",
        items: undefined,
        additionalProperties: undefined,
        required: false,
      },
    ],
  },
];
