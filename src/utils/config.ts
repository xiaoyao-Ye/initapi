import { tryRequire } from './index'

export type UserConfigExport = UserConfig | UserConfigFn

export type UserConfigFn = (env: UserConfig) => UserConfig | Promise<UserConfig>

export interface ConfigEnv {}

export interface UserConfig {
  importAxios?: string
  useAxios?: string
  swagger?: { [prop: string]: string }
  /** TS entity的属性是否可空, false根据文档生成, true 会加上? */
  nullable?: boolean
  /** entity class construct */
  /** api 返回类型默认值 Object.assign 或 new class(有一个问题是需要分辨是enum还是class) 理论上后端或者前端自行处理比较合理, api处理作用将不再单一 */
}

/**
 * Type helper to make it easier to use vite.config.ts
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 * The function receives a {@link ConfigEnv} object that exposes two properties:
 */
export function defineConfig(config: UserConfigExport): UserConfigExport {
  return config
}

const defaultOptions = () => ({
  importAxios: 'import axios from "axios";',
  useAxios: 'axios.request',
  swagger: {
    test: 'https://petstore.swagger.io/v2/swagger.json',
  },
})

export const getConfig = async (): Promise<UserConfig> => {
  try {
    const apiConfig: UserConfigExport = await tryRequire(`./api.config.ts`)
    let config: UserConfig = {}
    if (typeof apiConfig === 'function') {
      config = await apiConfig({})
    } else {
      config = apiConfig
    }
    return Object.assign(defaultOptions(), config)
  } catch (error) {
    console.error(error)
  }
}
