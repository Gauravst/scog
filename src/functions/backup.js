import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { createSpinner } from "nanospinner";
import runCommand from "../components/runCommand.js";

const homeDir = os.homedir();
const backupDir = path.join(homeDir, "scog");
const commitMsg = `Backup on ${new Date().toISOString()}`;

async function copyConfigs() {
  try {
    await fs.copyFile(tmuxConf, path.join(backupDir, "tmux.conf"));
  } catch (err) {
    console.error("Error copying configuration files:", err);
  }
}

const backup = async () => {
  await createBackupDir();
  await copyConfigs();

  runCommand("git add nvim .tmux.conf");
  runCommand(`git commit -m "${commitMsg}"`);

  runCommand("git push origin main");

  runCommand(`rm -rf ${path.join(backupDir, "nvim")}`);
  runCommand(`rm ${path.join(backupDir, ".tmux.conf")}`);

  console.log("Backup and push to GitHub completed successfully.");
};

export default backup();
