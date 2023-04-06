import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  splitting: false,
  outDir: 'lib',
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
});