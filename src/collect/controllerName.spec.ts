import { it, expect, describe } from "vitest";
import { getControllerName } from "./controllerName";

describe("Get controller name", () => {
  it("Should return a reasonable controller name", () => {
    const recordControllerName = {};
    const result = getControllerName("测试中文", recordControllerName, "/api", "/api/admin/xx/xx");
    const result2 = getControllerName("测试无commonPrefix", recordControllerName, "/api", "/xx/admin/xx/xx");
    const result3 = getControllerName("reasonable!@#$%^&*()_-=+'/.,<>name", recordControllerName);

    expect(result).toBe("Admin");
    expect(recordControllerName["测试中文"]).toBe("Admin");
    expect(result2).toEqual("XxAdmin");
    expect(recordControllerName["测试无commonPrefix"]).toBe("XxAdmin");
    expect(result3).toEqual("ReasonableName");
    expect(recordControllerName["reasonable!@#$%^&*()_-=+'/.,<>name"]).toBe("ReasonableName");
  });
});
