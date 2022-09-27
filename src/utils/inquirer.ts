import inquirer from 'inquirer'

const customAddressRule = [
  {
    name: 'customAddress',
    message: '请输入需要生成的json文件对应地址:',
    validate: (url: string) => url.length > 0,
  },
]

/**
 * 命令行交互获取生成文件类型, json资源地址
 * @returns
 */
export async function useInquirer(swagger: { [prop: string]: string }): Promise<{
  fileType: string
  url: string
  serviceName: string
}> {
  const serviceNameList = Object.keys(swagger)
  const rule = [
    {
      name: 'fileType',
      message: '请选择生成的api类型:',
      type: 'list',
      default: 'TypeScript',
      choices: ['TypeScript', 'JavaScript'],
    },
    {
      name: 'serviceName',
      message: '请选择swagger或openApi的预设json文件地址(custom选项可自定义地址):',
      type: 'list',
      default: serviceNameList[0],
      choices: [...serviceNameList, 'custom'],
    },
  ]

  let url
  const { fileType, serviceName } = await inquirer.prompt(rule)
  if (serviceName === 'custom') {
    const { customAddress } = await inquirer.prompt(customAddressRule)
    url = customAddress
  } else {
    url = swagger[serviceName]
  }

  return { fileType, serviceName, url }
}
