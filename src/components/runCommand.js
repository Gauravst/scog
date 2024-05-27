import { execSync } from "child_process";

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (err) {
    console.error(`Error executing command "${command}":`, err);
    process.exit(1);
  }
};

export default runCommand;
