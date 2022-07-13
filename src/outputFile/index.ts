import format from './prettier'

import fs from 'fs-extra'
import path from 'path'

/**
 * 根据文件名和数据输入文件
 * @param fileName 文件名(带文件类型)
 * @param data 数据
 */
export const outputFile = async (fileName: string, data: string) => {
  const filePath = path.join(process.cwd(), 'api', fileName)
  try {
    data = await format(data)
  } catch (error) {
    console.log('error', error);
  }
  await fs.outputFile(filePath, data)
}
