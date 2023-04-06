# TODO

- [ ] api.config
  - [ ] [medium] 可选属性(依赖后端文档准确性, 目前来看大部分后端文档还不够完善, 不适合启用这个功能)
  - [x] [medium] 索引签名(所有class或者interface都加上{[key: string]: any})
  - [x] [medium] entity 使用 class 还是使用 interface 定义?
  - [x] [medium] 目前生成的entity是class, 可以增加功能选择生成class或者interface(interface是允许定义多个同名类型的, 使用的时候是所有同名interface都需要满足, class不允许重复定义)
  - [x] [medium] Enum 使用 enum 定义还是使用 type 定义
  - [ ] [low] 是否启用自定义功能, 默认否
  - [ ] [low] custom 选项应该让用户输入生成的文件名称
  - [ ] [medium] 可配置指定的 prettier 文件?, 默认使用项目根目录的 (需要测试有哪几种格式, 存不存在问题)
  - [ ] [low] 可配置类型(ts,js,flutter)? 还是单独做ts+js, flutter
- [ ] [low] 根据 command 可以不进行 inquirer 交互
- [x] defineConfig 类型(todo: 定义文档)
- [x] [high] 当后端在 AppController(最外层) 编写接口, 并且没有设置(@ApiTags)时, AppController 里面的接口是没有tags的, 下面代码出现报错:
  - [x] `formatApi.js:31 -> const API_CLASS_NAME = API.tags[0];`
  - [x] 上面报错解决思路是所有没有 tags 的内容都加到一个公共的默认的 class 里面去, 负担就是className需要默认值?
- [ ] [low] 可使用 fetch 请求?
- [ ] [low] 适配 uni, 小程序 请求?
- [ ] [low] 生成js的话, js函数定义类型注释, path.xx 是什么作用
- [x] nestjs项目中, Dto 引用其他的 class 作为属性的类型, 这个属性会有一个 allOf 属性的第0个是$ref, 而正常的是直接有$ref属性
- [x] nestjs项目中, type: string 可能还有 enum 属性, enum+enumName后好像恢复正常了
- [ ] [low] 使用tsup打包()
- [x] api.config.ts 中导入 initapi 会找不到类型声明(@types/initapi ?) (直接内置类型解决了)
- [x] [high] api函数static 后是否应该有async和await
- [x] [high] ejs模板, 提供自定义模板
- [ ] [_high] 后端返回引用数据为null时, 前端生成最基本的数据结构(默认否)枚举和class分不清? 嵌套类型怎么处理? 如果需要这个功能必须是class才能new,interface应该不行
- [ ] [medium] 官网文档
- [ ] [medium] axios 返回类型res和实际返回类型res.data的类型定义(如果有fetch呢)
- [ ] [medium] 允许本地 (swagger|openapi).json/yaml? 转换文档
- [ ] [low] vscode, 网页在线转换等.
- [ ] [high] oneAPI
  - [ ] params和path的参数注释,
  - [ ] 所有的api函数是否增加入参`options?: { [key: string]: any },`
  - [ ] 是否根据 controller 划分api, 一个 controller 一个文件
  - [ ] entity是否声明为 `declare namespace Auth|API` 然后通过 `API.Dto` 去使用类型
- [x] [high] 文件顶部提示:
- [x] [high] 文件顶部initapi详情地址:

```ts
/* eslint-disable */
// 该文件由 initAPI 自动生成，请勿手动修改！
```

- [ ] [low] mock
- [ ] [high] controller class enum 都没有备注
- [ ] [medium] 处理 untreated type
- [ ] [medium] 当前生成进度实时打印出来, 对应的地方加上log
- [ ] refactor 配置项相关单独拎出来? 所有辅助函数统一维护? 函数式传参尽量减少? 命名语义化? 代码结构尽量清晰? 性能?
- [x] command 取消 custom 相关提示
- [x] createjs/ts 函数结构更改
- [ ] build 移除所有log? (console.info/error/chalk 都用了log, 考虑把`untreated type`相关移除)
- [ ] more...
