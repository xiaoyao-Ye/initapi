import { it, expect, describe, vi } from "vitest";
import { handleData } from "./handleData";
import { Data } from "../typings";
import { schemaToType } from "./schemaToType";

vi.mock("./schemaToType");

describe("data params", () => {
  it("should return the undefined", () => {
    const res = handleData(undefined);

    expect(res).toBe(undefined);
  });

  it("should return the parameter string", () => {
    const res = handleData("FormData");

    expect(res).toBe("data?: FormData");
  });

  it("should return the parameter string", () => {
    const schema: Data = { $ref: "#/components/schemas/User" };
    vi.mocked(schemaToType).mockReturnValue("User");

    expect(handleData(schema)).toBe("data?: User");

    vi.mocked(schemaToType).mockReturnValue("number");

    expect(handleData(schema)).toBe("data?: number");

    vi.mocked(schemaToType).mockReturnValue("Array<string>");

    expect(handleData(schema)).toBe("data?: Array<string>");
  });
});
