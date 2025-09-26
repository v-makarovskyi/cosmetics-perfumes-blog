import chalk from "chalk";
import table from "text-table";

import type {
  AppStatsCompilations,
  AppStatsErrorOrWarning,
} from "../../types/webpack.types";

function formatMessage(messageObj: AppStatsErrorOrWarning) {
  let output: string = "";
  let { moduleIdentifier, moduleName, loc, message } = messageObj;
  let lines: any = [moduleIdentifier, moduleName, loc, message];


  if (lines && lines[3] && typeof lines[3] === "string") {
    lines[3] = lines[3].split("\n");
    if(lines[3].length > 1) {
      lines[3][1] = chalk.bold.yellow(lines[3][1])
    }
    if (lines && lines[3] && Array.isArray(lines[3])) {
      lines[3] = lines[3].map((line) => {
        if (line.indexOf("Module not found") === 0) {
          let colorLinePath = line.match(/\/home\/.+/g)
          line = line.replace(
            "Module not found: Error: Can't resolve",
            chalk.bold("NOT FOUND OR RESOLVE FILE: ")
          ).replace(colorLinePath, chalk.cyan.bold(colorLinePath))
          return line;
        }
        if (line.indexOf("Module parse failed") === 0) {
          line = line.replace("Module parse failed", chalk.bold("PARSING ERROR in MODULE"));
          return line;
        }
        return line;
      });
    }
  }
  output += `${chalk.red.bold("Something went wrong")} ${chalk.bold.blue(
    "in"
  )} ${chalk.blueBright(lines[1])} ${chalk.bold.greenBright(lines[2])}\n\n`;
  
  output += `${lines[3].join('\n')}\n`
  output+= '-------------------------------------------------------'
  return output
}

function formatWebpackMessages(json: AppStatsCompilations) {
  const errors = json.errors?.map(formatMessage);
  const warns = json.warnings?.map(formatMessage);
  return {
    errors,
    warns,
  };
}

export { formatWebpackMessages };
