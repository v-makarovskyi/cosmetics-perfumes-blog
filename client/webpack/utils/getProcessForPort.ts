import chalk from "chalk";
import {
  execSync,
  execFileSync,
  type ExecFileSyncOptionsWithStringEncoding,
} from "child_process";

const execOptions: ExecFileSyncOptionsWithStringEncoding | any = {
  encoding: "utf-8",
  stdio: ["pipe", "pipe", "ignore"],
};

function getProcessIdOnPort(port: number) {
  return execFileSync(
    "lsof",
    ["-i:" + port, "-t", "-P", "-sTCP:LISTEN"],
    execOptions
  )
    .split("\n")[0]
    .trim();
}

function getDirectoryOfProcessById(processId: string) {
  return execSync(
    "lsof -p " +
      processId +
      ' | awk \'$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}\'',
    execOptions
  ).trim();
}

function getProcessCommand(processId: string) {
  let command = execSync(
    "ps -o command -p " + processId + " | sed -n 2p",
    execOptions
  );
  command = command.replace(/\n$/, "");
  return command;
}

function getProcessForPort(port: number) {
  try {
    const processId = getProcessIdOnPort(port);
    const directory = getDirectoryOfProcessById(processId);
    const command = getProcessCommand(processId);
    return (
      chalk.cyanBright(command) +
      chalk.grey(" (pid " + processId + ")\n") +
      chalk.blue(" на ") +
      chalk.cyanBright(directory)
    );
  } catch (error) {
    return null;
  }
}

export { getProcessForPort };
