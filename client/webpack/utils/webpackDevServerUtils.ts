import path from "path";
import fs from "fs";

import chalk from "chalk";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { appPaths } from "../config/paths";
import { formatWebpackMessages } from "./formatWebpackMessages";

import type {
  CreateCompilerFuncPropsType,
  AppCompiller,
} from "../../types/webpack.types";

const isInteractive: boolean = process.stdout.isTTY;

function printInstruction({
  appName: string, //urls: any
}) {}

function prepareUrls() {}

function createCompiler({
  Webpack,
  config,
  appName,
  useTS,
}: CreateCompilerFuncPropsType): AppCompiller {
  let compiller: AppCompiller;
  try {
    compiller = Webpack(config);
  } catch (err) {
    console.log(chalk.red("🚫 Неудачная компиляция!! 🚫"));
    console.log();
    console.log();
    process.exit(1);
  }

  compiller.hooks.invalid.tap("invalid", () => {
    if (isInteractive) {
      //clearConsole()
      console.log(chalk.blackBright.bold("⏳ Компиляция... ⏳"));
    }
  });

  let isFirstCompile: boolean = true;

  if (useTS) {
    forkTsCheckerWebpackPlugin
      .getCompilerHooks(compiller)
      .waiting.tap("awaitingTsCheck", () => {
        console.log();
        console.log(
          chalk.cyan(
            "⏱  Файлы успешно отправлены, ждем результатов проверки типов... ⏱"
          )
        );
        console.log();
      })
      forkTsCheckerWebpackPlugin
      .getCompilerHooks(compiller)
      .issues.tap('awaitingTsCheck', (issues) => {
        if(issues.length === 0) {
          console.log(
            chalk.blueBright.bold('🎉 Замечательно! Ошибок типов не выявлено 🎉')
          )
        } else {
          console.log(
            chalk.red.bold(
              `🔎 Что-то пошло не так! Нужно проверить все еще раз 🔎`
            )
          );
          console.log();
        }
        return issues
      })
      
}
  

  compiller.hooks.done.tap("done", async (stats) => {
    if (isInteractive) {
      //cleatConsole()
    }

    const statsData = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
    });

    //console.log('statsData', statsData);

    const messages = formatWebpackMessages(statsData);

    const isSuccessFul = !messages.errors?.length && !messages.warns?.length;
    if (isSuccessFul) {
      console.log(chalk.green.bold(`🔆 Компиляция прошла успешно! 🔆`));
    }

    if (isSuccessFul && (isInteractive || isFirstCompile)) {
      printInstruction({
        appName,
        //urls
      });
    }

    isFirstCompile = false;

    if (messages.errors?.length) {
      console.log(
        chalk.red(`🚫❌ Компиляция завершилась с ошибками... ❌🚫\n`)
      );
      console.log(messages.errors.join("\n\n"));
      console.log();
      return;
    }
    if (messages.warns?.length) {
      console.log(
        chalk.yellow("🟠 Компиляция завершилась с предупреждениями 🟠\n")
      );
      console.log(messages.warns.join("\n\n"));
      console.log(
        `\nЧтобы узнать больше о каждом предупреждении, выполните поиск по ${chalk.underline(
          chalk.yellow("ключевым словам")
        )} .`
      );
      console.log();
    }
  });

  return compiller;
}

export { createCompiler, prepareUrls };
