<div align="center"><img src="https://xiaoyao-ye.github.io/blog/initApi/light.svg" /></div>

<br />
<br />

<div align="center"> A tool for creating API and typings </div>

<br />

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/blob/main/README.zh-CN.md">Chinese</a> | English
</p>

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/stargazers"><img src="https://img.shields.io/github/stars/xiaoyao-Ye/initapi" /></a>
  <a href="https://www.npmjs.com/package/initapi"><img src="https://badgen.net/npm/v/initapi" /></a>
</p>

<br />

> If it's helpful to you, please don't be stingy with your star, so that I have the motivation to update and maintain it

## Features

- Code as Document
- Standardized, unified team style, easy to maintain
- Tool generates code to reduce coding and improve efficiency
- If the backend uses Swagger or Openapi3 specifications, it can be accessed at zero cost

## install

```bash
pnpm i initapi -D
```

## usage

> configure `api.config.ts`

```ts
import { defineConfig } from 'initapi'
// you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:
export default defineConfig({
  // Path related configurations are all based on the working directory of the nodejs process
  // Supports Openapi3 and Swagger specifications, with content created based on specified JSON
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

## configure

Detailed configuration items for defineConfig

| Name        | Description                                                                                                                                                                                                           | Type                         | Required | Default                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------- | ---------------------------- |
| importAxios | Import axios or axios encapsulation                                                                                                                                                                                   | `string`                     | No       | 'import axios from "axios";' |
| useAxios    | Using axios                                                                                                                                                                                                           | `string`                     | No       | 'axios.request'              |
| swagger     | The JSON (`swagger/openapi3`specification) file address corresponding to the API service                                                                                                                              | `object`                     | Yes      | —                            |
| outputDir   | Output file storage location                                                                                                                                                                                          | `string`                     | No       | './api'                      |
| outputType  | Output File Type - When there is no configuration, a command line interaction will pop up for selection                                                                                                               | `TypeScript` or `JavaScript` | No       | —                            |
| definition  | How to define types                                                                                                                                                                                                   | `class` or `interface`       | No       | interface                    |
| indexable   | The advantage of using index signature is that it can add any number of attributes, making `interface` or `class` more flexible; The disadvantage is that it may cause uncertainty in the value type of the attribute | `boolean`                    | No       | false                        |
| enumMode    | How to define enumeration (enum: generate enumeration type. type: generate type alias.)                                                                                                                               | `enum` or `type`             | No       | type                         |

## default

Before creating a file, by default, the data will be formatted using a prettier

When the project root directory has a. prettier file, the default configuration will be used for file formatting. If obtaining the file fails, the built-in prettier will be used to format the default configuration:

```JavaScript
const defaultOptions: prettier.Options = {
  parser: 'typescript',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
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
