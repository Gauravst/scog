#!/usr/bin/env node

import commander from "commander";

import init from "./src/init.js";
import backup from "./src/backup.js";
import restore from "./src/restore.js";
import addFiles from "./src/addFiles.js";

async function main() {
  commander
    .command("init")
    .description("initialize")
    .action(() => {
      init();
    });

  commander
    .command("backup")
    .description("backup your config & push github")
    .action(() => {
      backup();
    });

  commander
    .command("restore")
    .description("restore config to your system")
    .action(() => {
      restore();
    });

  commander
    .command("file")
    .description("add folder and file")
    .action(() => {
      addFiles();
    });

  await commander.parseAsync(process.argv);
}

main();
