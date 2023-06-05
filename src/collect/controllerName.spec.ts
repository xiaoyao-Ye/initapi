import { it, expect, describe } from "vitest";
import { getControllerName } from "./controllerName";

describe("Get controller name", () => {
  it("Should return a reasonable controller name", () => {
    const tags = [{ name: "测试_!@#$%^&*()_-=+'/.,<>中文", description: "description-测试中文" }];
    const name = getControllerName("测试_!@#$%^&*()_-=+'/.,<>中文", []);
    const name = getControllerName("reasonableName", []);

    expect().toEqual(result);
  });
});
