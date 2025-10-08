import path from "path";
import fs from "fs";
import chalk from "chalk";

function checkRequiredFiles(files: Array<string>) {
  let currentFilePath: string | undefined = "";
  try {
    files.forEach((filepath) => {
      currentFilePath = filepath;
      fs.accessSync(filepath, fs.constants.F_OK);
    });
    return true;
  } catch (error) {
    const dirname = path.dirname(currentFilePath);
    const filename = path.basename(currentFilePath);
    console.log(chalk.red("Поиск обязательного файла не увенчался успехом!"));
    console.log(chalk.red("Имя файла: " + chalk.blue.bold(filename)));
    console.log(chalk.red("Поиск производился в " + chalk.blue.bold(dirname)));
    return false;
  }
}

export { checkRequiredFiles };
