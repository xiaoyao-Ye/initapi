import prettier from "prettier";
import path from "path";
import { tryRequire } from "../utils/index";

const defaultOptions: prettier.Options = {
  // 解析器
  parser: "typescript",
  // 一行最多 130 字符
  printWidth: 130,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: false,
  // 对象的 key 仅在必要时用引号
  quoteProps: "as-needed",
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: "all",
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  bracketSameLine: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号always, avoid
  arrowParens: "avoid",
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: "preserve",
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: "ignore",
  // 换行符使用 auto, lf
  endOfLine: "auto",
};

/**
 * TS/JS格式化代码
 * @param code 文件数据
 * @param options 格式化规则
 * @returns 格式化后的数据
 */
export default async function format(code: string): Promise<string> {
  const prettierConfig = await getOptions();
  return prettier.format(code, prettierConfig);
}

/**
 * 获取当前node运行目录下的 .prettier 文件的配置进行格式化
 */
async function getOptions(): Promise<prettier.Options> {
  const options = await Promise.resolve(tryRequire(path.join(process.cwd(), ".prettierrc")));
  return Object.assign({}, defaultOptions, options);
}
