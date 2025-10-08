import chalk from "chalk";
import table from "text-table";

import type {
  AppStatsCompilations,
  AppStatsErrorOrWarning,
} from "../../types/webpack.types";

function formatMsg(
  message: AppStatsErrorOrWarning | AppStatsCompilations[] | string
) {
  let lines: string[] | string = [];
  if (typeof message === "string") {
    lines = message.split("\n");
  } else if ("message" in message) {
    lines = message["message"].split("\n");
  } else if (Array.isArray(message)) {
    message.forEach((message) => {
      if ("message" in message) {
        lines = message["message"].split("\n");
      }
    });
  }

  //replace first line in parse filed error
  //(example: 'Module parse failed: Unexpected token (17:4)\n' -->>   PARSING ERROR: Unexpected token (17:4))
  if (
    lines &&
    typeof lines[0] === "string" &&
    lines[0].startsWith("Module parse failed")
  ) {
    const loc = /\([0-9][0-9]?:[0-9][0-9]?\)/.exec(lines[0]);
    lines[0] = lines[0]
      .replace(/^Module parse failed/, chalk.red.bold("PARSING ERROR"))
      .replace(loc ? loc[0] : "", loc ? chalk.bold.greenBright(loc[0]) : "");
  }

  if (
    lines &&
    typeof lines[0] === "string" &&
    lines[0].indexOf("[eslint]") === 0
  ) {
    lines.shift();
  }

  message = lines.join("\n");
  return message.trim();
}

function formatWebpackMessages(json: AppStatsCompilations) {
  const errors = json.errors?.map(formatMsg);
  const warns = json.warnings?.map(formatMsg);

  return {
    errors,
    warns,
  };
}

export { formatWebpackMessages };
