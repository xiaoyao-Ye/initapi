import { it, expect, describe, vi } from "vitest";
import { defaultOptions, getConfig } from "./config";
import { tryRequire } from ".";

vi.mock("./index");

describe("Get config", () => {
  it("should return the default configuration", async () => {
    vi.mocked(tryRequire).mockReturnValue({});

    const config = await getConfig();

    expect(config).toEqual(defaultOptions());
  });

  it("should return the user configuration", async () => {
    vi.mocked(tryRequire).mockReturnValue({
      service: {
        admin: { url: "https://192.168.0.1:1024/api/swagger.json" },
      },
      definition: "class",
      indexable: true,
      enumMode: "enum",
      multipleFiles: false,
    });

    const config = await getConfig();

    expect(config).toEqual({
      importRequest: 'import axios from "axios";',
      useRequest: "axios.request",
      service: {
        admin: { url: "https://192.168.0.1:1024/api/swagger.json" },
      },
      outputDir: "./api",
      definition: "class",
      indexable: true,
      enumMode: "enum",
      multipleFiles: false,
    });
  });
});
