#!/usr/bin/env node

import { Command } from "commander";
import init from "./src/functions/init.js";
// import backup from "./src/functions/backup.js";
// import restore from "./src/functions/restore.js";
// import addFiles from "./src/functions/addFiles.js";

async function main() {
  const program = new Command();

  program
    .command("init")
    .description("initialize")
    .action(async () => {
      await init();
    });

  // program
  //   .command("backup")
  //   .description("backup your config & push to github")
  //   .action(async () => {
  //     await backup();
  //   });
  //
  // program
  //   .command("restore")
  //   .description("restore config to your system")
  //   .action(async () => {
  //     await restore();
  //   });
  //
  // program
  //   .command("file")
  //   .description("add folder and file")
  //   .action(async () => {
  //     await addFiles();
  //   });
  //
  await program.parseAsync(process.argv);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
