import { defineConfig } from './src/index'

export default defineConfig({
  // importAxios: 'import axios from "../index";',
  useAxios: 'axios.request',
  swagger: {
    // TODO test: swagger2openapi 转换为 openapi3 时会有问题，所以出现 UserArray 的class
    test: 'https://petstore.swagger.io/v2/swagger.json',
    mangosteen: 'http://127.0.0.1:3000/api-json',
  },
  outputDir: './src/api',
  // outputType: 'TypeScript',
  // definition: 'class',
  // indexable: true
  // enumMode: 'enum'
})
