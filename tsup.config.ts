import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  splitting: false,
  outDir: "lib",
  format: ["cjs", "esm"],
  // tsup 打包类型声明文件默认会找index.d.ts, 没有index.d.ts的情况下是打包入口文件的导出类型
  dts: true,
  clean: true,
});
