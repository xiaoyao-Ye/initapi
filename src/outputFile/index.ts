import format from "./prettier";
import fs from "fs-extra";
import path from "path";
import { consola } from "consola";

/**
 * 根据文件名和数据输入文件
 * @param outputDir 输出目录
 * @param fileName 文件名(带文件类型)
 * @param data 数据
 */
export const outputFile = async (outputDir: string, fileName: string, data: string) => {
  const filePath = path.join(process.cwd(), outputDir, fileName);
  try {
    data = await format(data);
  } catch (error) {
    consola.error(error);
  }
  await fs.outputFile(filePath, data);
};
