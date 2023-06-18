/** 判断是否需要收集当前 PATH_ITEM 信息 */
const isNeedCollect = (method: string) => {
  const methodsUpper = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
  const methodsLower = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];
  return methodsUpper.includes(method) || methodsLower.includes(method);
};

/** 判断对象是否为空 */
const isEmpty = (obj: any = {}) => {
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  return false;
};

export { isNeedCollect, isEmpty };
