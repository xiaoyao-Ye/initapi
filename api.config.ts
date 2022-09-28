import { defineConfig } from './src/index'

export default defineConfig({
  importAxios: 'import axios from "../index";',
  useAxios: 'axios.request',
  swagger: {
    mangosteen: 'http://127.0.0.1:3000/api-json',
  },
  outputDir: './src/api',
})
