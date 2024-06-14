import askQuestion from "../components/askQuestion";
import generateCode from "../components/generateCode";
import { dbConnect, runSQL, insertData } from "../db/db";
import { getAllGroup, getUser } from "../db/sql";
import inquirer from "inquirer";

const addFiles = async () => {
  const db = await dbConnect();
  const user = await runSQL(getUser);

  const groupChoose = await askQuestion("Change files group (main) yes or no ");

  let group;
  if (groupChoose == "yes" || groupChoose == "y") {
    const groupInfo = await runSQL(getAllGroup);
    const groupList = groupInfo.map((item) => item.name);
    await groupList.push("CREATE NEW GROUP");

    const questions = [
      {
        type: "list",
        name: "action",
        message: "Select an group:",
        choices: groupList,
      },
    ];

    const answer = await inquirer.prompt(questions);
    group = answer.choice;

    if (answer.choice == "CREATE NEW GROUP") {
      const newGroupName = askQuestion("Enter group name");
      const branchName = await generateCode(10);

      const groupInfo = await insertData(db, "group", {
        name: newGroupName,
        branch: branchName,
        user: user.id,
      });

      group = groupInfo.name;
    }
  }

  const files = [];
  let file = 1;
  while (file != 0) {
    file = await askQuestion("Enter new File Path (0 for exit)");
    files.push(file);
  }

  const addFileQuery = db.prepare(
    "INSERT INTO 'user' ('file', 'group') VALUES (?, ?)",
  );

  files.forEach((file) => {
    addFileQuery.run(file, group.id);
  });
};

export default addFiles;
