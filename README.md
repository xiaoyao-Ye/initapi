# initapi

A tool for creating API and entity

```bash
pnpm i initapi -D
```

## use

> 配置 `api.config.ts`

```ts
import { defineConfig } from 'initapi'
// you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:
export default defineConfig({
  // ...
  // 路径相关配置都是基于 node.js 进程的当前工作目录
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
- [x] defineConfig 类型
- [ ] more...
