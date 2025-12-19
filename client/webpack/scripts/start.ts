process.on("unhandledRejection", (err) => {
  throw err;
});

import { existsSync } from "fs";

import Webpack from "webpack";
import WebpackDewServer from "webpack-dev-server";
import chalk from "chalk";

import { appPaths } from "../config/paths";
import { createWebpackDevServerConfig } from "../config/webpackDevServerConfig";
import { checkBrowsers } from "../utils/browsersHelpers";
import { checkRequiredFiles } from "../utils/checkRequiredFiles";
import {
  createCompiler,
  prepareUrls,
  choosePort,
} from "../utils/webpackDevServerUtils";
import { config as configFactory } from "../config/webpack.config";

if (
  !checkRequiredFiles([appPaths.appHtml as string, appPaths.appIndex as string])
) {
  process.exit(1);
}

if (process.env.HOST) {
  console.log(
    `\nПроизошла попытка привязки к переменной среды HOST: ${chalk.bold.yellow(
      process.env.HOST
    )}`
  );
  console.log(
    `Если это произошло непреднамеренно, проверьте, не установили ли вы его по ошибке в своей оболочке.`
  );
  console.log();
}

const isInteractive: boolean = process.stdout.isTTY;
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const HOST = process.env.HOST || "0.0.0.0";

checkBrowsers(appPaths.appPath as string, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port === null) {
      return;
    }
    const config = configFactory("development");
    const appName = require(appPaths.appPkg as string)["name"];
    const useTS = existsSync(appPaths.appTsConfig as string);
    const protocol = process.env.HTTPS === "true" ? "https" : "http";

    const urls = prepareUrls(
      protocol,
      HOST,
      port,
      appPaths.publicUrlOrPath.slice(0, -1) as string
    );

    const compiler = createCompiler({ Webpack, config, appName, useTS, urls });

    const serverConfig = {
      ...createWebpackDevServerConfig(urls.lanUrlForConfig as string),
      port,
      host: HOST,
    };

    const server = new WebpackDewServer(serverConfig, compiler);

    server.startCallback(() => {
      console.log(
        chalk.blueBright.bold(
          `Сервер разработки успешно запущен не порту ${
            port ? port : DEFAULT_PORT
          }...\n`
        )
      );
    });

    server.stopCallback(() => {
      ["SIGINT", "SIGTERM"].forEach((sig) => {
        process.on(sig, () => {
          server.stop();
          console.log(chalk.red.bold(`\n🛑 Сервер разработки остановлен.`));
          process.exit();
        });
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
