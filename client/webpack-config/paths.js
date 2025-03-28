const path = require("path");
const fs = require("fs");

const buildPath = process.env.NODE_ENV || "build";
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtentions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

const resolveModule = (resolveFn, fileName) => {
  const extention = moduleFileExtentions.find((extention) =>
    fs.existsSync(resolveFn(`${fileName}.${extention}`))
  );
  if (extention) {
    return resolveFn(`${fileName}.${extention}`);
  }
  return resolveFn(`${fileName}.js`);
};

module.exports = {
  appPath: resolveApp("."),
  appIndexJs: resolveModule(resolveApp, "index"),
  appIndexHtml: resolveApp("public/index.html"),
  appPackageJson: resolveApp("package.json"),
  appTsConfig: resolveApp("tsconfig.json"),
  appSrc: resolveApp("src"),
  appPublic: resolveApp("public"),
  appBuild: resolveApp(buildPath),
  dotenv: resolveApp(".env"),
};

module.exports.moduleFileExtentions = moduleFileExtentions
