<div align="center"><img src="https://xiaoyao-ye.github.io/blog/initApi/light.svg" /></div>

<br />
<br />

<div align="center"> A tool for generating APIs and types </div>

<br />

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/blob/main/README.zh-CN.md">Chinese</a> | English
</p>

<p align="center">
  <a href="https://github.com/xiaoyao-Ye/initapi/stargazers"><img src="https://img.shields.io/github/stars/xiaoyao-Ye/initapi" /></a>
  <a href="https://www.npmjs.com/package/initapi"><img src="https://badgen.net/npm/v/initapi" /></a>
</p>

<br />

## Features

- Code as Document
- Standardized, unified team style, easy to maintain
- Tool generates code to reduce coding and improve efficiency
- If the backend uses Swagger or Openapi3 specifications, it can be accessed at zero cost

## Install

```bash
pnpm i initapi -D
```

## Usage

> configure `api.config.ts` or `api.config.js`

```ts
import { defineConfig } from 'initapi'
// you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:
export default defineConfig({
  // Path related configurations are all based on the working directory of the nodejs process
  // Supports Openapi3 and Swagger specifications, with content created based on specified JSON
  service: {
    pets: {
      url: 'https://petstore.swagger.io/v2/swagger.json',
    },
    platform: {
      url: 'http://127.0.0.1:3000/api-json',
      commonPrefix: "/api/v1"
    },
    // Can convert local JSON
    local: {
      url: './assets/openapi.json',
      // API address public prefix, used to generate class names and file names. When not configured, it will automatically attempt to find the public prefix
      commonPrefix: "/mg/api"
    },
  },
  outputDir: './src/api',
  outputType: 'TypeScript',
  // ...
})
```

```json
// package.json
"scripts": {
  "create-api": "initapi create"
}
```

```bash
pnpm run create-api
```

Generate API Content Example

![Generate API Content Example](https://xiaoyao-ye.github.io/blog/initApi/api.png)

Generate Type Content Example

![Generate Type Content Example](https://xiaoyao-ye.github.io/blog/initApi/type.png)

Usage examples

![Usage examples](https://xiaoyao-ye.github.io/blog/initApi/usage.png)

## Configure

Detailed configuration items for defineConfig

| Name         | Description                                                  | Type                         | Required | Default                      |
| ------------ | ------------------------------------------------------------ | ---------------------------- | -------- | ---------------------------- |
| importRequest  | Import axios or axios encapsulation                          | `string`                     | No       | 'import axios from "axios";' |
| useRequest     | Using axios                                                  | `string`                     | No       | 'axios.request'              |
| service      | The JSON (`swagger/openapi3`specification) file address corresponding to the API service | `object`                     | Yes      | —                            |
| outputDir    | Output file storage location                                 | `string`                     | No       | './api'                      |
| outputType   | Output File Type - When there is no configuration, a command line interaction will pop up for selection | `TypeScript` or `JavaScript` | No       | —                            |
| definition   | How to define types                                          | `class` or `interface`       | No       | interface                    |
| indexable    | The advantage of using index signature is that it can add any number of attributes, making `interface` or `class` more flexible; The disadvantage is that it may cause uncertainty in the value type of the attribute | `boolean`                    | No       | false                        |
| enumMode     | How to define enumeration (enum: generate enumeration type. type: generate type alias.) | `enum` or `type`             | No       | type                         |
| multipleFiles | Enable multi file mode - single file only creates API files. Multiple files will split the API into all controllers and generate corresponding files | `boolean`                     | No       | false                           |

## Default

Before creating a file, by default, the data will be formatted using a prettier

When the project root directory has a. prettier file, the default configuration will be used for file formatting. If obtaining the file fails, the built-in prettier will be used to format the default configuration:

```JavaScript
const defaultOptions: prettier.Options = {
  parser: "typescript",
  printWidth: 130,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: true,
  jsxBracketSameLine: true,
  arrowParens: "avoid",
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "ignore",
  endOfLine: "auto",
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

## Last

Welcome to provide feedback and contribute code.
