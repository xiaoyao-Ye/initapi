import prettier from 'prettier'

const defaultOptions: prettier.Options = {
  // 解析器
  parser: 'typescript',
  // 解析规则
  // 单引号
  singleQuote: false,
  // 尾分号
  semi: true,
  jsxSingleQuote: false,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  rangeStart: 0,
  rangeEnd: Infinity,
  proseWrap: 'preserve',
  arrowParens: 'avoid',
  endOfLine: 'lf',
}

/**
 * TS/JS格式化代码
 * @param code 文件数据
 * @param options 格式化规则
 * @returns 格式化后的数据
 */
export default function format(code: string, options: prettier.Options = defaultOptions): string {
  return prettier.format(code, options)
}
