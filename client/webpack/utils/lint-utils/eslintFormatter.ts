import path from "path";
import chalk from "chalk";
import table from "text-table";

type LintMessage = import("eslint").Linter.LintMessage;
type LintResult = import("eslint").ESLint.LintResult;

const cwd = process.cwd();

function getRelativePath(filepath: string) {
  return path.relative(cwd, filepath);
}

function isError(msg: LintMessage) {
  if (msg.severity === 2 || msg.fatal) return true;
  return false;
}

function eslintFormatter(results: LintResult[]) {
  let output = "\n";
  let hasError = false;
  let repportContainsRuleErrorIds = false;

  results.forEach((result) => {
    let messagesArray: string[][] | LintMessage[];
    messagesArray = result.messages;

    if (messagesArray.length === 0) return;

    messagesArray = messagesArray.map((message) => {
      let messageType: "error" | "warning";
      if (isError(message)) {
        messageType = "error";
        hasError = true;
        if (message.ruleId) {
          repportContainsRuleErrorIds = true;
        }
      } else {
        messageType = "warning";
      }

      let line = message.line.toString() || "0";
      if (message.column) {
        line += ":" + message.column;
      }
      let position = "Line " + line;

      return [
        "",
        position,
        messageType,
        message.message.replace(/\.$/, ""),
        chalk.underline(message.ruleId || ""),
      ];
    });

    messagesArray.forEach((m) => {
      m[4] = m[2] === "error" ? chalk.red(m[4]) : chalk.yellow(m[4]);
      m.splice(2, 1);
    });

    let messageTable = table(messagesArray, {
      align: ["l", "l", "l"],
    });

    output += `${chalk.yellowBright.bold("[custom--lint]")} ${chalk.blueBright(
      getRelativePath(result.filePath)
    )}\n`;
    output += `${messageTable}\n\n`;
  });

  if (repportContainsRuleErrorIds) {
    output +=
      "Стоит обратить внимание на " +
      chalk.red.bold.underline("ключевые слова") +
      ", чтобы узнать больше о каждой ошибке " +
      chalk.bold.red("ESLint") +
      ".";
  }

  return output;
}

export { eslintFormatter };
