import path, { resolve } from "path";
import fs from "fs";

import chalk from "chalk";
import { detect } from "detect-port";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import isRoot from "is-root";
import prompts from "prompts";
import url from "node:url";

import { appPaths } from "../config/paths";
import { formatWebpackMessages } from "./formatWebpackMessages";
import { getProcessForPort } from "./getProcessForPort";
import { getIp } from "./getIp";

import type {
  CreateCompilerFuncPropsType,
  AppCompiller,
  PromptsObjectType,
} from "../../types/webpack.types";

const isInteractive: boolean = process.stdout.isTTY;

function prepareUrls(
  protocol: string,
  host: string,
  port: number,
  pathname = "/"
) {
  const formatUrl = (hostname: string) => {
    return url.format({
      protocol,
      hostname,
      port,
      pathname,
    });
  };
  const prettyPrintUrl = (hostname: string) => {
    return url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname,
    });
  };

  const isHostNotDefined = host === "0.0.0.0" || host === "::";
  let prettyHost: string,
    lanUrlForConfig: string | undefined,
    lanUrlForTerminal: string | undefined;

  if (isHostNotDefined) {
    prettyHost = "localhost";
    try {
      lanUrlForConfig = getIp();
      if (lanUrlForConfig) {
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
        }
      } else {
        lanUrlForConfig = undefined;
      }
    } catch (error) {
      //ignore
    }
  } else {
    prettyHost = host;
  }

  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);

  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForBrowser,
    localUrlForTerminal,
  };
}

function printInstruction(appName: string, urls: { [x: string]: string }) {
  console.log();
  console.log(
    `🔭 Теперь ${chalk.bold(appName)} можно просмативать в браузере 🔭`
  );
  console.log();
  console.log(
    `  🏠 ${chalk.bold.blue("Локально: ")}       ${urls.localUrlForTerminal}`
  );
  console.log(
    `  📡 ${chalk.bold.blue("В вашей сети: ")}   ${urls.lanUrlForTerminal}`
  );
  console.log();
  console.log(
    `🔔 Кстати, сборка для ${chalk.underline(
      "production"
    )} режима не оптимизирована.`
  );
  console.log(
    `🔔 Для создания оптимизированой производственной сборки используйте команду: ${chalk.blueBright.bold(
      "npm run build"
    )}`
  );
  console.log();
}

function choosePort(host: string, defaultPort: number): Promise<number | null> {
  return detect(defaultPort).then(
    (port) => {
      return new Promise((resolve) => {
        if (defaultPort === port) {
          return resolve(port);
        }
        const message =
          process.platform !== "win32" && defaultPort < 1024 && !isRoot()
            ? +`Для запуска сервера на порту ниже 1024 требуются права администратора.`
            : `Что-то уже запущено на порту: ${chalk.blue.bold(
                `${defaultPort}`
              )}.`;
        if (isInteractive) {
          //clearConsole()
          const existingProcess = getProcessForPort(defaultPort);
          const question: PromptsObjectType = {
            type: "confirm",
            name: "chouldChangePort",
            message:
              chalk.yellow(
                message +
                  `${existingProcess ? ` Вероятно:\n ${existingProcess}` : ""}`
              ) + "\n\nХотите ли вы запустить приложение на другом порту?",
            initial: true,
          };
          prompts(question).then((answer) => {
            if (answer.chouldChangePort) {
              resolve(port);
            } else {
              resolve(null);
            }
          });
        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
      });
    },
    (err) => {
      throw new Error(
        chalk.red(
          `Не удалось найт открытый порт на хосте: ${chalk.bold(`${host}`)}`
        ) +
          "\n" +
          (`Сообщение об ошибке сети: ` + err.message || err) +
          "\n"
      );
    }
  );
}

function createCompiler({
  Webpack,
  config,
  appName,
  useTS,
  urls,
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
      });
    forkTsCheckerWebpackPlugin
      .getCompilerHooks(compiller)
      .issues.tap("awaitingTsCheck", (issues) => {
        if (issues.length === 0) {
          console.log(
            chalk.blueBright.bold(
              "🎉 Замечательно! Ошибок типов не выявлено 🎉"
            )
          );
        } else {
          console.log(
            chalk.red.bold(
              `🔎 Что-то пошло не так! Нужно проверить все еще раз 🔎`
            )
          );
          console.log();
        }
        return issues;
      });
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

    const messages = formatWebpackMessages(statsData);

    const isSuccessFul = !messages.errors?.length && !messages.warns?.length;
    if (isSuccessFul) {
      console.log(chalk.green.bold(`🔆 Компиляция прошла успешно! 🔆`));
    }

    if (isSuccessFul && (isInteractive || isFirstCompile)) {
      printInstruction(appName, urls);
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

export { createCompiler, prepareUrls, choosePort };
