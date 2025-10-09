import fs from "fs";

import recursive from "recursive-readdir";
import chalk from "chalk";
import { gzipSizeSync } from "gzip-size";

import { appPaths } from "../config/paths";

function canReadAsset(asset: string) {
  return /\.(js|css)$/.test(asset);
}

function removeFileHash(buildFolder: string, filename: string) {
  return filename
    .replace(buildFolder, "")
    .replace(/\\/, "")
    .replace(
      /\/?(.*)(\.[\da-f]+)(\.chunk)?(\.js|\.css)/,
      (match, p1, p2, p3, p4) => p1 + p4
    );
}

function measureFileSizesBeforeBuild(
  buildFolder: string
): Promise<{ root: string; sizes: { [x: string]: number } }> {
  return new Promise((resolve) => {
    recursive(buildFolder, (err: Error, filenames: Array<string>) => {
      let sizes = {};
      if (!err && filenames) {
        sizes = filenames
          .filter(canReadAsset)
          .reduce((memo: { [x: string]: number }, filename: string) => {
            let content = fs.readFileSync(filename);
            let key = removeFileHash(buildFolder, filename);
            memo[key] = gzipSizeSync(content);
            return memo;
          }, {});
      }
      resolve({
        root: buildFolder,
        sizes,
      });
    });
  });
}

function printFileSizesAfterBuild() {}

export { measureFileSizesBeforeBuild, printFileSizesAfterBuild };
