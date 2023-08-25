import { PathsObject } from "openapi3-ts/dist/oas31";

export const paths: PathsObject = {
  "/mg/api/Config/edit": {
    post: {
      tags: ["Config"],
      summary: "修改配置文件",
      parameters: [
        {
          name: "From",
          in: "header",
          description: "Platform/Staff",
          required: true,
        },
        {
          name: "PId",
          in: "header",
          description: "服务商ID：87e58c9e-5a33-4624-a697-cbf18cb75a71",
          required: true,
        },
        {
          name: "appid",
          in: "header",
          description: "应用ID",
          required: true,
        },
      ],
      requestBody: {
        description: "",
        content: {
          "application/json-patch+json": {
            schema: {
              $ref: "#/components/schemas/ConfigEntity",
            },
          },
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ConfigEntity",
            },
          },
          "text/json": {
            schema: {
              $ref: "#/components/schemas/ConfigEntity",
            },
          },
          "application/*+json": {
            schema: {
              $ref: "#/components/schemas/ConfigEntity",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Success",
        },
      },
    },
  },
  "/mg/api/Config/list": {
    get: {
      tags: ["Config"],
      summary: "获取配置文件列表",
      parameters: [
        {
          name: "From",
          in: "header",
          description: "Platform/Staff",
          required: true,
        },
        {
          name: "PId",
          in: "header",
          description: "服务商ID：87e58c9e-5a33-4624-a697-cbf18cb75a71",
          required: true,
        },
        {
          name: "appid",
          in: "header",
          description: "应用ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "text/plain": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigEntity",
                },
              },
            },
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigEntity",
                },
              },
            },
            "text/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigEntity",
                },
              },
            },
          },
        },
      },
    },
  },
  "/mg/api/Config/typeList/{type}": {
    get: {
      tags: ["Config"],
      summary: "根据条件返回配置文件列表",
      parameters: [
        {
          name: "type",
          in: "path",
          required: true,
          schema: {
            $ref: "#/components/schemas/ConfigType",
          },
        },
        {
          name: "From",
          in: "header",
          description: "Platform/Staff",
          required: true,
        },
        {
          name: "PId",
          in: "header",
          description: "服务商ID：87e58c9e-5a33-4624-a697-cbf18cb75a71",
          required: true,
        },
        {
          name: "appid",
          in: "header",
          description: "应用ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "text/plain": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigDto",
                },
              },
            },
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigDto",
                },
              },
            },
            "text/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ConfigDto",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const apiMap = {
  Config: {
    description: "",
    apiList: [
      {
        url: "/mg/api/Config/edit",
        method: "post",
        summary: "修改配置文件",
        path: [],
        params: [],
        data: {
          $ref: "#/components/schemas/ConfigEntity",
        },
      },
      {
        url: "/mg/api/Config/list",
        method: "get",
        summary: "获取配置文件列表",
        path: [],
        params: [],
        data: {},
        response: {
          type: "array",
          items: {
            $ref: "#/components/schemas/ConfigEntity",
          },
        },
      },
      {
        url: "/mg/api/Config/typeList/{type}",
        method: "get",
        summary: "根据条件返回配置文件列表",
        path: [
          {
            name: "type",
            description: "",
            schema: {
              $ref: "#/components/schemas/ConfigType",
            },
          },
        ],
        params: [],
        data: {},
        response: {
          type: "array",
          items: {
            $ref: "#/components/schemas/ConfigDto",
          },
        },
      },
    ],
  },
};
