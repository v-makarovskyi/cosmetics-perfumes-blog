import fs from "fs";
import path from "path";
import chalk from "chalk";

import ts, { type CompilerOptions } from "typescript";
import { type ResolveOptions } from "webpack";

import { appPaths } from "./paths";

function getAdditionalModulePath(opts: CompilerOptions) {
  const baseUrl = opts.baseUrl;
  if (!baseUrl) return "";

  const resolvedBasePath = path.resolve(appPaths.appPath as string, baseUrl);

  if (path.relative(appPaths.appNodeModules as string, resolvedBasePath) === "")
    return null;
  if (path.relative(appPaths.appPath as string, resolvedBasePath) === "")
    return null;

  throw new Error(
    chalk.red.bold(
      `В данном проекте в качестве baseUrl в tsconfig.json можно установить только базовый каталог пректа.`
    )
  );
}

function getWebpackResolveAlias(opts: CompilerOptions = {}): ResolveOptions['alias'] {
    const baseUrl = opts.baseUrl
    if(!baseUrl) return {}

    const resolvedBasePath = path.resolve(appPaths.appPath as string, baseUrl)

    if(path.relative(appPaths.appPath as string, resolvedBasePath) === '') {
        return {
            '@src/*': path.join(appPaths.appSrc as string, '*'),
            '@svg/*': path.join(appPaths.appSrc as string, 'svg/*'),
            '@public/*': path.join(appPaths.appPublic as string, '*'),
            '@images/*': path.join(appPaths.appPublic as string, 'images/*')
        }
    } else return {}
}

function getModules() {
  const isTsConfig = fs.existsSync(appPaths.appTsConfig as string);
  const isJsConfig = fs.existsSync(appPaths.appJsConfig as string);

  if (isJsConfig && isTsConfig) {
    throw new Error(
      chalk.red(
        `Судя по всему вы пишите проект с использованием "typescript". Пожалуйста удалите "jsconfig.json"`
      )
    );
  }
  let config;
  if (isTsConfig) {
    config = ts.readConfigFile(
      appPaths.appTsConfig as string,
      ts.sys.readFile
    ).config;
  }
  config = config || {};
  
  const options = config.compilerOptions || {};
 

  const additionalModulePath = getAdditionalModulePath(options);

  return {
    additionalModulePath,
    alias: getWebpackResolveAlias(options),
  };
}

export { getModules };
