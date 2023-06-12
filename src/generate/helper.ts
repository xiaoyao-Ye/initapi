/**
 * 传入注释字符串 不为空则返回 \/** description *\/ 格式
 * @param description 备注
 */
const useDescription = (description: string) => {
  return description ? `/** ${description} */` : "";
};

export { useDescription };
