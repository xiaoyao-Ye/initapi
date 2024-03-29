import { tryRequire } from "./index";
import path from "path";
import { consola } from "consola";

export type UserConfigExport = UserConfig | UserConfigFn;

export type UserConfigFn = (env: UserConfig) => UserConfig | Promise<UserConfig>;

export interface UserConfig {
  /** 导入请求函数 default: 'import axios from "axios";' */
  importRequest?: string;
  /** 使用请求函数 default: 'axios.request' */
  useRequest?: string;
  /**
   * 后端服务配置
   * default: { testService: { url: 'https://petstore.swagger.io/v2/swagger.json' } }
   */
  service?: Record<
    string,
    {
      /** 后端接口服务对应的 swagger/openapi json地址 */
      url: string;
      /** api地址公共前缀-用于创建 controller 名称或者文件名称 */
      commonPrefix?: string;
    }
  >;
  /** TS entity的属性是否可空, false根据文档生成, true 会加上? */
  // nullable?: boolean
  /** 生成文件存放位置 default: './api' */
  outputDir?: string;
  /** 生成文件类型-无配置时会弹出命令行交互让用户选择 */
  outputType?: "TypeScript" | "JavaScript";
  /** 定义类型的方式 default: interface (两者的区别请自行查询TypeScript) */
  definition?: "class" | "interface";
  /**
   * 索引签名 default: false
   * 使用索引签名的优点是可以添加任意数量的属性，使得 interface | class 更加灵活；缺点是可能会导致属性的值类型不确定
   */
  indexable?: boolean;
  /**
   * 定义枚举的方式 default: type
   * enum: 生成枚举类型
   * type: 生成类型别名
   */
  enumMode?: "enum" | "type";
  /**
   * 启用多文件模式 default: true
   * 单文件只创建api文件 多文件会将api拆分出所有controller生成对应文件
   */
  multipleFiles?: boolean;

  /** entity class construct */
  /** api 返回类型默认值 Object.assign 或 new class(有一个问题是需要分辨是enum还是class) 理论上后端或者前端自行处理比较合理, api处理作用将不再单一 */
}

/**
 * Type helper to make it easier to use api.config.ts
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 */
export function defineConfig(config: UserConfigExport): UserConfigExport {
  return config;
}

/** 默认配置 */
export const defaultOptions = (): UserConfig => ({
  importRequest: 'import axios from "axios";',
  useRequest: "axios.request",
  service: {
    testService: { url: "https://petstore.swagger.io/v2/swagger.json" },
  },
  outputDir: "./api",
  definition: "interface",
  indexable: false,
  enumMode: "type",
  multipleFiles: true,
});

export const getConfig = async (): Promise<UserConfig> => {
  try {
    const apiConfig: UserConfigExport = await tryRequire(path.join(process.cwd(), "api.config"));
    let config: UserConfig = typeof apiConfig === "function" ? await apiConfig({}) : apiConfig;
    return Object.assign(defaultOptions(), config);
  } catch (error) {
    consola.error("try require error, please check 'api.config.{ts,js}' file.");
  }
};
