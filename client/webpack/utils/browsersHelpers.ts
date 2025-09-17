//hode.js core
import path from "path";
import fs from "fs";
import os from "os";

//import node_modules packages
import { packageUp } from "package-up";
import browserslist from "browserslist";
import prompts from "prompts";
import chalk from "chalk";

//import types
import type { PromptsObjectType } from "../webpack.types";
import { appPaths } from "../config/paths";

const defaultBrowsers: { [x: string]: readonly string[] } = {
  production: [">0.2%", "not dead", "not op_mini all"],
  development: [
    "last 1 chrome version",
    "last 1 safari version",
    "last 1 firefox version",
  ],
};

function shouldSetBrowsers(isInteractive: boolean): Promise<boolean | prompts.Answers<string>> {
  if (!isInteractive) return Promise.resolve(true);
  const question: PromptsObjectType = {
    type: "confirm",
    name: "shouldSetBrowsers",
    message:
      chalk.yellow("Мы не можем определить целевые браузеры.") +
      `\n\nХотите ли вы добавить список браузеров по умолчанию в свой ${chalk.red(
        "package.json"
      )} файл?`,
    initial: true,
  };
  return prompts(question).then((answer) => answer.shouldSetBrowsers);
}

function checkBrowsers(
  dir: string,
  isInteractive: boolean,
  retry: boolean = true
): Promise<string | string[]> {
  const current = browserslist.loadConfig({ path: dir });
  if (current !== void 0) return Promise.resolve(current);

  if (!retry) {
    return Promise.reject(
      new Error(
        chalk.red(
          `Список браузеров по умолчанию в ${chalk.bold(
            "package.json"
          )} не установлен.` +
            `\nПожалуйста добавьте поле ${chalk.underline(
              "browserslist"
            )} в ваш ${chalk.bold("package.json")}.`
        )
      )
    );
  }

  return shouldSetBrowsers(isInteractive).then((shouldSetBrowsers) => {
    if (!shouldSetBrowsers) return checkBrowsers(dir, isInteractive, false);
    return packageUp({ cwd: dir }).then((filepath) => {
      if (filepath === void 0) return Promise.reject();
      const pkg = JSON.parse(fs.readFileSync(filepath, "utf-8"));
      pkg["browserslist"] = defaultBrowsers;
      fs.writeFileSync(filepath, JSON.stringify(pkg, null, 2) + os.EOL);
      browserslist.clearCaches();
      console.log();
      console.log(
        chalk.blue(
          `Дефолтный список браузеров успешно установлен. Проверьте свой ${chalk.bold.underline(
            "package.json"
          )}.`
        )
      );
      console.log();
    })
    .catch(() => {})
    .then(() => checkBrowsers(dir, isInteractive, false))
  });
}

export { checkBrowsers, defaultBrowsers };
