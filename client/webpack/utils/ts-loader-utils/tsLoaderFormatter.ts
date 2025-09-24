import path from "path";

import chalk from "chalk";
import { TsLoaderErrorInfo } from "../../../types/webpack.types";

const CWD = process.cwd();

function getRelativePath(cwd: string, filepath: string) {
  return path.relative(cwd, filepath);
}

function tsLoaderFormatter(message: TsLoaderErrorInfo) {
  let position: string, output: string;

  output = "\n";
  position = `(${message.line.toString()}:${message.character.toString()})`;

  output += `${getRelativePath(CWD, message.file)}\n`;

  output += `${chalk.blueBright.bold("[customTSL] ")} ${
    message.severity === "error"
      ? chalk.red.bold(message.severity.toUpperCase())
      : chalk.yellow.bold(message.severity.toUpperCase())
  } in ${chalk.bold.hex("#CCCCFF")(
    message.file + chalk.bold(position)
  )}.\n             ${chalk.bold.hex("#CCCCFF")(
    "TS" + message.code + ": " + message.content
  )}`;

  return output.trim();
}

export { tsLoaderFormatter };
