import fs from "fs";
import url from "url";

import chalk from "chalk";

function printHostingInstructions(
  appPkg: { [x: string]: any },
  publicUrl: string,
  publicPath: string,
  buildFolder: string
) {
  if (publicPath !== "/") {
    printBaseMessage(buildFolder, publicPath);
  } else {
    printBaseMessage(buildFolder, publicPath);
    printStaticServerInstructions(buildFolder);
  }
}

function printBaseMessage(buildFolder: string, hostingLocation: string) {
  console.log(
    `Проект был собран с учётом того, что он размещён на ${chalk.blueBright.bold(
      hostingLocation || "корневом сервере"
    )}.`
  );
  console.log(
    `Однако, это можно контролировать с помощью поля ${chalk.green(
      '"homepage"'
    )} в вашем ${chalk.blueBright("package.json")}.`
  );
  console.log();
  console.log(
    `Папка ${chalk.blueBright.bold(
      buildFolder
    )} готова к развертыванию. И это очень хорошая новость :)`
  );
}

function printStaticServerInstructions(buildFolder: string) {
  console.log(
    `Вы также можете обслуживать папку ${buildFolder} с помощью статического сервера:'`
  );
  console.log();
  console.log(`  ${chalk.blueBright("npm")} install -g serve`);
  console.log(`  ${chalk.blueBright("serve")} -s ${buildFolder}`);
  console.log();
}

export { printHostingInstructions };
