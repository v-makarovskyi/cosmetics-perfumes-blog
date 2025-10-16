process.on("unhandledRejection", (err) => {
  throw err;
});

import path from "path";

import Webpack from "webpack";
import chalk from "chalk";
import { emptyDirSync, copySync } from "fs-extra";
import bfg from "bfj";

import { appPaths } from "../config/paths";
import { config as configFactory } from "../config/webpack.config";
import { checkBrowsers } from "../utils/browsersHelpers";
import { checkRequiredFiles } from "../utils/checkRequiredFiles";
import {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} from "../utils/fileSizeReporter";
import { formatWebpackMessages } from "../utils/formatWebpackMessages";
import { printHostingInstructions } from "../utils/printHostingInstructions";
import { printBuildError } from "../utils/printBuildError";

import type { AppStatsErrorOrWarning } from "@client_types/webpack.types";

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const isInteractive = process.stdout.isTTY;

const writeStatsJson = process.argv.indexOf("--stats") !== -1;

if (
  !checkRequiredFiles([appPaths.appHtml as string, appPaths.appIndex as string])
) {
  process.exit(1);
}

const config = configFactory("production");

checkBrowsers(appPaths.appPath as string, isInteractive)
  .then(() => {
    return measureFileSizesBeforeBuild(appPaths.appBuild as string);
  })
  .then((previousFileSizes) => {
    emptyDirSync(appPaths.appBuild as string);
    copyPublicFolder();
    return build(previousFileSizes);
  })
  .then(
    ({ previousFileSizes, stats, warnings }) => {
      if (warnings?.length) {
        console.log(
          chalk.yellow("🟠 Компиляция завершилась с предупреждениями 🟠\n")
        );
        console.log(warnings.join("\n\n"));
        console.log(
          `\nЧтобы узнать больше о каждом предупреждении, выполните поиск по ${chalk.underline(
            chalk.yellow("ключевым словам")
          )} .`
        );
        console.log();
      } else {
        console.log(chalk.green.bold(`🔆 Компиляция прошла успешно! 🔆\n`));
      }
      console.log("Размер файлов после сжатия: \n");
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        appPaths.appBuild as string,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(appPaths.appPkg as string);
      const publicUrl = appPaths.publicUrlOrPath;
      const publicPath = config.output?.publicPath;
      const buildFolder = path.relative(
        process.cwd(),
        appPaths.appBuild as string
      );

      printHostingInstructions(
        appPackage,
        publicUrl as string,
        publicPath as string,
        buildFolder
      );
    },
    (err) => {
      console.log(
        chalk.red.bold(
          "Сбой компиляции при попытке создать production сборку\n"
        )
      );
      printBuildError(err);
      process.exit(1);
    }
  )
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
      process.exit(1);
    }
  });

function build(previousFileSizes: {
  root: string;
  sizes: { [x: string]: number };
}): Promise<{
  stats: Webpack.Stats | undefined;
  previousFileSizes: { root: string; sizes: { [x: string]: number } };
  warnings: string[] | undefined;
}> {
  console.log(
    chalk.bold.blueBright(
      "Началось создание оптимизированной производственной сборки...\n"
    )
  );
  const compiler = Webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages: ReturnType<typeof formatWebpackMessages> = {
        errors: [],
        warns: [],
      };

      if (err) {
        if (!err.message) {
          return reject(err);
        }
        let errMessage: AppStatsErrorOrWarning["message"] = err.message;
        messages = formatWebpackMessages({
          errors: [{ message: errMessage }],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats
            ? stats.toJson({ all: false, errors: true, warnings: true })
            : {}
        );
      }
      if (messages.errors?.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        reject(new Error(messages.errors.join("\n\n")));
      }

      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI?.toLowerCase() !== "false") &&
        messages.warns?.length
      ) {
        const filteredWarnings = messages.warns?.filter(
          (w) => !/Failed to parse source map/.test(w)
        );
        if (filteredWarnings?.length) {
          console.log(
            chalk.yellow(`\nПредупреждения рассматриваются как ошибки...\n`)
          );
          reject(new RangeError(filteredWarnings.join("\n\n")));
        }
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warns,
      };

      if (writeStatsJson) {
        bfg
          .write(appPaths.appBuild + "/bundle-stats.json", stats?.toJson())
          .then(() => resolve(resolveArgs))
          .catch((err: Error | null) => err);
      }

      resolve(resolveArgs);
    });
  });
}

function copyPublicFolder() {
  copySync(appPaths.appPublic as string, appPaths.appBuild as string, {
    dereference: true,
    filter: (file) => file !== appPaths.appHtml,
  });
}
