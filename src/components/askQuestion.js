import inquirer from "inquirer";

const askQuestion = async (question) => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "input",
      message: question,
    },
  ]);
  return answer.input;
};

export default askQuestion;
