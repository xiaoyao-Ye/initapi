<div align="center"><img src="https://xiaoyao-ye.github.io/blog/initApi/light.svg" /></div>

<br />
<br />

<div align="center"> A tool for creating API and entity </div>

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

## TODO

- [ ] 可选属性
- [ ] entity 使用 class 还是使用 interface 定义?
- [ ] 根据 command 可以不进行 inquirer 交互
- [x] defineConfig 类型
- [x] 当后端在 AppController(最外层) 编写接口, 并且没有设置(@ApiTags)时, AppController 里面的接口是没有tags的, 下面代码出现报错:
  - [ ] `formatApi.js:31 -> const API_CLASS_NAME = API.tags[0];`
  - [ ] 上面报错解决思路是所有没有 tags 的内容都加到一个公共的默认的 class 里面去, 负担就是className需要默认值?
- [x] 可配置指定的 prettier 文件用于格式化?
- [ ] 是否使用自定义prettier格式化, 默认否?
- [ ] 可使用 fetch 请求?
- [ ] 适配 uni, 小程序 请求?
- [ ] 可配置类型(ts,js,flutter)? 还是单独做ts+js, flutter
- [x] nestjs项目中, Dto 引用其他的 class 作为属性的类型, 这个属性会有一个 allOf 属性的第0个是$ref, 而正常的是直接有$ref属性
- [x] nestjs项目中, type: string 可能还有 enum 属性, enum+enumName后好像恢复正常了
- [ ] 目前生成的entity是class, 可以增加功能选择生成class或者interface(interface是允许定义多个同名类型的, 使用的时候是所有同名interface都需要满足, class不允许重复定义)
- [ ] 使用tsup打包()
- [ ] api.config.ts 中导入 initapi 会找不到类型声明(@types/initapi ?)
- [ ] custom 选项应该让用户输入生成的文件名称
- [ ] more...

## other

  2023/03/01 将 "openapi3-ts": "^2.0.2", 升级至 "openapi3-ts": "^3.2.0",

## default

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
