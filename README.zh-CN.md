<div align="center"><img src="https://xiaoyao-ye.github.io/blog/initApi/light.svg" /></div>

<br />
<br />

<div align="center"> 用于创建 API 和 typings 的工具 </div>

<br />

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/blob/main/README.md">English</a> | Chinese
</p>

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/stargazers"><img src="https://img.shields.io/github/stars/xiaoyao-Ye/initapi" /></a>
  <a href="https://www.npmjs.com/package/initapi"><img src="https://badgen.net/npm/v/initapi" /></a>
</p>

<br />

> 如果对你有帮助, 请不要吝啬你的star, 以便于让我有动力更新和维护

## Features

- 代码即文档
- 规范化, 统一团队风格, 便于维护
- 工具生成代码, 减少 coding 提高效率
- 如果后端使用 swagger 或 openapi3 规范, 可零成本接入
- ...

## install

```bash
pnpm i initapi -D
```

## configure

defineConfig 的详细配置项

| 属性        | 说明                                                                                                                | 类型                         | 是否必填 | 默认值                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------- | ---------------------------- |
| importAxios | 导入 axios 或 axios 封装                                                                                            | `string`                     | 否       | 'import axios from "axios";' |
| useAxios    | 使用请求函数                                                                                                        | `string`                     | 否       | 'axios.request'              |
| swagger     | API 服务对应的 json(`swagger/openapi3`规范)文件地址                                                                 | `object`                     | 是       | —                            |
| outputDir   | 输出文件存放位置                                                                                                    | `string`                     | 否       | './api'                      |
| outputType  | 输出文件类型-无配置时会弹出命令行交互让选择                                                                         | `TypeScript` or `JavaScript` | 否       | —                            |
| definition  | 定义类型的方式                                                                                                      | `class` or `interface`       | 否       | interface                    |
| indexable   | 使用索引签名的优点是可以添加任意数量的属性，使得`interface` or `class` 更加灵活；缺点是可能会导致属性的值类型不确定 | `boolean`                    | 否       | false                        |
| enumMode    | 定义枚举的方式(enum: 生成枚举类型 type: 生成类型别名)                                                               | `enum` or `type`             | 否       | type                         |

## usage

> 配置 `api.config.ts`

```ts
import { defineConfig } from 'initapi'

export default defineConfig({
  // 与路径相关的配置都基于nodejs进程的工作目录
  // 支持 openapi3 和 swagger 规范, 内容根据指定的 json 创建
  swagger: {
    pets: 'https://petstore.swagger.io/v2/swagger.json',
    platform: 'http://127.0.0.1:3000/api-json',
  },
  outputDir: './src/api',
  outputType: 'TypeScript',
  // ...
})
```

```package.json
"scripts": {
  "create-api": "initapi create"
}
```

```bash
pnpm run create-api
```

## default

创建文件之前默认会使用 prettier 对数据进行格式化

项目根目录有 .prettier 文件时默认会使用该配置进行文件格式化, 获取文件失败则使用内置的 prettier 格式化默认配置:

```JavaScript
const defaultOptions: prettier.Options = {
  // 解析器
  parser: 'typescript',
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  bracketSameLine: false,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号always, avoid
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 auto, lf
  endOfLine: 'auto',
}
```

## Git commit

- 💍 test: Adding missing tests
- 🎸 feat: A new feature
- 🐛 fix: A bug fix
- 🤖 chore: Build process or auxiliary tool changes
- ✏️ docs: Documentation only changes
- 💡 refactor: A code change that neither fixes a bug or adds a feature
- 💄 style: Markup, white-space, formatting, missing semi-colons...
- 🎡 ci: CI related changes
- ⚡️ perf: A code change that improves performance
