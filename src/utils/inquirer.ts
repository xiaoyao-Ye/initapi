import inquirer from 'inquirer'

/**
 * 命令行交互获取生成文件类型, json资源地址
 * @returns
 */
export async function useInquirer(swagger: { [prop: string]: string }, outputType: string | undefined): Promise<{
  fileType: string
  url: string
  serviceName: string
}> {
  const serviceNameList = Object.keys(swagger)
  const rule = []
  if (typeof outputType === 'undefined') {
    rule.push({
      name: 'fileType',
      message: '请选择您需要生成的 API 类型:',
      type: 'list',
      default: 'TypeScript',
      choices: ['TypeScript', 'JavaScript'],
    })
  }
  rule.push({
    name: 'serviceName',
    message: '请选择 API 文档json地址:',
    type: 'list',
    default: serviceNameList[0],
    choices: [...serviceNameList],
    // choices: [...serviceNameList, 'custom'],
  })

  let url
  const { fileType, serviceName } = await inquirer.prompt(rule)
  // if (serviceName === 'custom') {
  //   const customAddressRule = [
  //     {
  //       name: 'customAddress',
  //       message: '请输入需要生成的json文件对应地址:',
  //       validate: (url: string) => url.length > 0,
  //     },
  //   ]
  //   const { customAddress } = await inquirer.prompt(customAddressRule)
  //   url = customAddress
  // } else {
    url = swagger[serviceName]
  // }

  return { fileType: outputType ?? fileType, serviceName, url }
}
