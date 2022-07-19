import inquirer from 'inquirer'

const jsonUrl: { [prop: string]: string } = {
  mg: 'http://192.168.1.57:8100/swagger/v1/swagger.json',
  staff: 'http://192.168.1.57:9020/swagger/v1/swagger.json',
  store: 'http://192.168.1.57:9010/swagger/Store/swagger.json',
  platform: 'http://192.168.1.57:5100/swagger/v1/swagger.json',
  file: 'http://192.168.1.57:4100/swagger/v1/swagger.json',
  test: 'https://petstore.swagger.io/v2/swagger.json',
  test1: 'https://tools.kalvinbg.cn/static/tmp/swagger.json',
}


const jsonAddressList = Object.keys(jsonUrl);
const rule = [
  { name: 'fileType', message: '请选择生成的api类型:', type: 'list', default: 'TypeScript', choices: ["TypeScript", "JavaScript"], },
  {
    name: 'jsonAddress', message: '请选择swagger或openApi的预设json文件地址(custom选项可自定义地址):',
    type: 'list',
    default: jsonAddressList[0],
    choices: [...jsonAddressList, 'custom'],
  },
]
const customAddressRule = [
  { name: 'customAddress', message: '请输入需要生成的json文件对应地址:', validate: (url: string) => url.length > 0 },
]


/**
 * 命令行交互获取生成文件类型, json资源地址
 * @returns 
 */
export const useInquirer = async (): Promise<{ fileType: string, url: string }> => {
  // TODO: 配置文件
  // const rootDir = resolve(process.cwd(), '.')
  // Read build.config and package.json
  // const buildConfig: BuildConfig = tryRequire('./build.config', rootDir) || {}

  let url;
  const { fileType, jsonAddress } = await inquirer.prompt(rule);
  if (jsonAddress === 'custom') {
    const { customAddress } = await inquirer.prompt(customAddressRule);
    url = customAddress;
  } else {
    url = jsonUrl[jsonAddress];
  }

  return { fileType, url }
}