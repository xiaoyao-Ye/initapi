#!/usr/bin/env node
import { program } from "commander";
import { checkUpdate, pkgVersion } from "./utils/checkUpdate";
import { main } from "./main";
export { defineConfig } from "./utils/config";

program.name("initapi").version(pkgVersion, "-V, --version").usage("<command> [options]");

program
  .command("update")
  .description("update the cli to latest version(global)")
  .action(() => checkUpdate());

program
  .command("create")
  .description("create API and typings")
  .action(() => main());

program.parse(process.argv);
