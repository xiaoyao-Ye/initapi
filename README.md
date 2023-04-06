<div align="center"><img src="https://xiaoyao-ye.github.io/blog/initApi/light.svg" /></div>

<br />
<br />

<div align="center"> A tool for creating API and typings </div>

<br />
<br />

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

  💍  test:       Adding missing tests
  🎸  feat:       A new feature
  🐛  fix:        A bug fix
  🤖  chore:      Build process or auxiliary tool changes
  ✏️  docs:       Documentation only changes
  💡  refactor:   A code change that neither fixes a bug or adds a feature
  💄  style:      Markup, white-space, formatting, missing semi-colons...
  🎡  ci:         CI related changes
  ⚡️  perf:       A code change that improves performance
