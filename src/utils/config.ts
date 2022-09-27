import { Config } from '../type'
import { tryRequire } from './index'

export const getConfig = async (): Promise<Config> => {
  const options = {
    import: 'import axios from "axios";',
    swagger: {
      test: 'https://petstore.swagger.io/v2/swagger.json'
    }
  }
  try {
    const config = await tryRequire(`./api.config.js`)
    return Object.assign(options, config)
  } catch (error) {
    console.error(error)
  }
}
