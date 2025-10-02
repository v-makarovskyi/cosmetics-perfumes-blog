import path from "path";
import chalk from "chalk";
import table from "text-table";

type LintMessage = import("eslint").Linter.LintMessage;
type LintResult = import("eslint").ESLint.LintResult;

const cwd = process.cwd();

function isError(message: LintMessage) {
  if (message.severity === 2 || message.fatal) {
    return true;
  }
  return false;
}

function getRelativePath(filepath: string) {
  return path.relative(cwd, filepath);
}

function eslintFormatter(results: LintResult[]) {
  let output: string = "\n";
  let hasError: boolean = false;
  let reportContainsRuleErrorsIds: boolean = false;

  results.forEach((result) => {
    let messagesArray: LintMessage[] | string[][];
    messagesArray = result.messages;
    if (messagesArray.length === 0) return;

    messagesArray = messagesArray.map((message) => {
      let messsageType: "error" | "warn";
      if (isError(message)) {
        hasError = true;
        messsageType = "error";
        if (message.ruleId) {
          reportContainsRuleErrorsIds = true;
        }
      } else {
        messsageType = "warn";
      }
      let line = message.line.toString() || "0";
      if (message.column) {
        line += ":" + message.column;
      }
      let position = "Line " + line + ":";

      return [
        "",
        position,
        messsageType,
        message.message.replace(/\.$/, ""),
        chalk.underline(message.ruleId || ""),
      ];
    });
    if (hasError) {
      messagesArray = messagesArray.filter((m) => m[2] === "error");
    }
    messagesArray.forEach((m) => {
      m[4] = m[2] === "error" ? chalk.red(m[4]) : chalk.yellow[m[4]];
      m.splice(2, 1);
    });
    let messageTable = table(messagesArray, {
      align: ["l", "l", "l"],
    });

    output += chalk.blueBright(
      `[eslint] ${getRelativePath(result.filePath)}\n`
    );
    output += `${messageTable}\n\n`;
  });
  return output;
}

export { eslintFormatter };
