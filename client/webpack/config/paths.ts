//hode.js core
import path from "path";
import fs from "fs";

//import app modules
import { getPublicUrlOrPath } from "../utils/getPublicUrlOrPath";

//import types 'webpack.types.ts'
import { type AppPaths } from "../../types/webpack.types";

const publicUrlOrPath = getPublicUrlOrPath();
const buildPath = process.env.BUILD_PATH || "build";
const appDirectory: string = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const moduleExtensions: string[] = ["js", "mjs", "jsx", "ts", "tsx", "json"];

const resolveModule = (resolveCb: typeof resolveApp, filePath: string) => {
  const extension = moduleExtensions.find((ext) => {
    return fs.existsSync(resolveCb(`${filePath}.${ext}`));
  });
  if (extension) {
    return resolveCb(`${filePath}.${extension}`);
  }
  return resolveCb(`${filePath}.js`);
};

const appPaths: AppPaths = {
    appPath: resolveApp('.'),
    dotenv: resolveApp('.env'),
    appBuild: resolveApp(buildPath),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appSrc: resolveApp('src'),
    appIndex: resolveModule(resolveApp, 'src/index'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    appPkg: resolveApp('package.json'),
    appNodeModules: resolveApp('node_modules'),
    appWebpackCache: resolveApp('node_modules/.cache'),
    appTsInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'), 
    publicUrlOrPath,
    moduleExtensions
}


export { appPaths }