import runCommand from "./runCommand";

const createBranch = async (branchName) => {
  await runCommand(`git checkout --orphan ${branchName}`);
  await runCommand("git rm -rf ./data");
  await runCommand("git add .");
  await runCommand("git commit --allow-empty -m 'new branch'");
  await runCommand(`git push origin ${branchName}`);
};

export default createBranch;
