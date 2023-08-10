import { it, expect, describe } from "vitest";
import { collectAPI } from ".";
import { apiMap, paths } from "./index.data";

describe("collect api", () => {
  it("should collect", () => {
    const commonPrefix = "/mg/api";
    const tags = [];

    const res = collectAPI(paths, tags, commonPrefix);

    expect(res).toEqual(apiMap);
  });
});
