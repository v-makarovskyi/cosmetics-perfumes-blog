import chalk from "chalk";

import type {
  AppStatsCompilations,
  AppStatsErrorOrWarning,
} from "../../types/webpack.types";

function formatMessage(msg: AppStatsErrorOrWarning | string) {
  let lines: string[] = [];
  if (msg && typeof msg === "object") {
    lines = msg.message.split("\n");
  }

  if (lines[0].indexOf("Module not found") === 0) {
    lines[0] = lines[0].replace(
      "Module not found: Error: Can't resolve",
      chalk.bold(
        `${chalk.red("[webpack_error]")} ${chalk.underline(
          "CAN'T FIND OR RESOLVE FILE:"
        )}`
      )
    );
  }

  if (lines[0].indexOf("Module parse failed") === 0) {
    lines[0] = lines[0].replace(
      "Module parse failed",
      chalk.bold(
        `${chalk.red("[webpack_error]")} ${chalk.underline("PARSING ERROR")}`
      )
    );
  }

  msg = lines.join("\n").trim();

  return msg;
}

function formatWebpackMessages(jsonObj: AppStatsCompilations) {
  const formattedErrors = jsonObj.errors?.map(formatMessage);
  const formattedWarns = jsonObj.warnings?.map(formatMessage);
  return {
    errors: formattedErrors,
    warns: formattedWarns,
  };
}

export { formatWebpackMessages };
