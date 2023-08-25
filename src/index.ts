#!/usr/bin/env node
import { program } from "commander";
import { consola } from "consola";
import { checkUpdate, pkgVersion } from "./utils/checkUpdate";
import { main } from "./main";
import chalk from "chalk";
export { defineConfig } from "./utils/config";

consola.box(chalk.yellowBright("Hello, welcome to use initapi!"));

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
