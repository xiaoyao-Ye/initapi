# initapi

A tool for creating API and entity

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
- [ ] outputType 属性不设置时, 不会弹出`? 请选择生成的api类型: (Use arrow keys)` 这个交互命令
  - [ ] 猜测可能是`if (typeof outputType != 'undefined') {` 这行代码的判断逻辑问题
- [ ] 可配置指定的 prettier 文件用于格式化?
- [ ] 可使用 fetch 请求?
- [ ] 适配 uni, 小程序 请求?
- [ ] 可配置类型(ts,js,flutter)? 还是单独做ts+js, flutter
- [x] nestjs项目中, Dto 引用其他的 class 作为属性的类型, 这个属性会有一个 allOf 属性的第0个是$ref, 而正常的是直接有$ref属性
- [x] nestjs项目中, type: string 可能还有 enum 属性, enum+enumName后好像恢复正常了
- [ ] 目前生成的entity是class, 可以增加功能选择生成class或者interface(interface是允许定义多个同名类型的, 使用的时候是所有同名interface都需要满足, class不允许重复定义)
- [ ] 使用tsup打包()
- [ ] api.config.ts 中导入 initapi 会找不到类型声明(@types/initapi ?)
- [ ] more...

## other

  2023/03/01 将 "openapi3-ts": "^2.0.2", 升级至 "openapi3-ts": "^3.2.0",
