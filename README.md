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
- [ ] more...
