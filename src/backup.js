import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createSpinner } from "nanospinner";

import runCommand from "./components/runCommand";

const homeDir = $HOME;
const backupDir = path.join(homeDir, "scog");
const commitMsg = `Backup on ${new Date().toISOString()}`;
const tmuxConf = path.join(homeDir, "./config/tmux/tmux.config");

async function createBackupDir() {
  try {
    await fs.mkdir(backupDir, { recursive: true });
  } catch (err) {
    console.error("Error creating backup directory:", err);
  }
}

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
