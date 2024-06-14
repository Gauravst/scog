import runCommand from "../components/runCommand.js";
import askQuestion from "../components/askQuestion.js";
import { dbConnect, runSQL, insertData } from "../db/db.js";
import { createUserSQL, createFileSQL, createGroupSQL } from "../db/sql.js";
import fs from "fs";
import createBranch from "../components/createBranch.js";
import generateCode from "../components/generateCode.js";
import { createSpinner } from "nanospinner";

const init = async () => {
  const dbFile = "./src/db/scog.db";
  const dataDir = "./src/data";

  if (fs.existsSync(dbFile)) {
    askQuestion("Already Initialized! Do you want to re-init? (no)");

    if (askQuestion == "y" || askQuestion == "yes") {
      fs.unlinkSync(dbFile);
      fs.rm(dataDir, { recursive: true, force: true });
    } else {
      return;
    }
  }

  const github = await askQuestion("Enter repo SSH -");

  let spinner = createSpinner("setuping repo").start();
  await runCommand(`git clone ${github} ./data`);
  spinner.success();

  const db = await dbConnect();

  spinner = createSpinner("creating db").start();
  await runSQL(db, createUserSQL);
  await runSQL(db, createGroupSQL);
  await runSQL(db, createFileSQL);
  spinner.success();

  spinner = createSpinner("initializing").start();
  const user = await insertData(db, "user", { ssh: github });

  const branchName = await generateCode(10);
  const group = await insertData(db, "group", {
    name: "main",
    branch: branchName,
    user: user.id,
  });

  db.close();

  await createBranch(branchName);
  spinner.success();
};

export default init;
