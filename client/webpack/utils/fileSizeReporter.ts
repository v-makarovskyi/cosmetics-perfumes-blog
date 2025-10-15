import path from "path";
import fs from "fs";

import recursive from "recursive-readdir";
import stripAnsi from "strip-ansi";
import chalk from "chalk";
import { gzipSizeSync } from "gzip-size";
import { filesize } from "filesize";

import type { Stats } from "webpack";

function canReadFile(asset: string) {
  return /\.(js|css)$/.test(asset);
}

function removeFileNameHash(buildFolder: string, filename: string) {
  return filename
    .replace(buildFolder, "")
    .replace(/\\/g, "/")
    .replace(
      /\/?(.*)(\.[\da-f]+)(\.chunk)?(\.js|\.css)/,
      (match, p1, p2, p3, p4) => p1 + p4
    );
}

function measureFileSizesBeforeBuild(
  buildFolder: string
): Promise<{ root: string; sizes: { [x: string]: number } }> {
  return new Promise((resolve) => {
    recursive(buildFolder, (err, fileNames) => {
      let sizes = {};
      if (!err && fileNames) {
        sizes = fileNames
          .filter((filename) => canReadFile(filename))
          .reduce((memo: { [x: string]: number }, filename: string) => {
            let fileContent = fs.readFileSync(filename);
            let key = removeFileNameHash(buildFolder, filename);
            memo[key] = gzipSizeSync(fileContent);
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

function printFileSizesAfterBuild(
  webpackStats: Stats | undefined,
  prevFileSizes: { root: string; sizes: { [x: string]: number } },
  buildFolder: string,
  maxBundleGzipSize: number,
  maxChunkGzipSize: number
) {
  const root = prevFileSizes.root;
  const sizes = prevFileSizes.sizes;

  const assets = webpackStats
    ?.toJson({ all: false, assets: true })
    ["assets"]?.filter((asset) => canReadFile(asset.name))
    .map((asset) => {
      let assetContent = fs.readFileSync(path.join(root, asset.name));
      let assetSize = gzipSizeSync(assetContent);
      let prevFileSize = sizes[removeFileNameHash(root, asset.name)];
      let difference = getDifferenceLabel(assetSize, prevFileSize);

      return {
        folder: path.join(path.basename(buildFolder), path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: assetSize,
        sizeLabel:
          filesize(assetSize) + (difference ? " (" + difference + ")" : ""),
      };
    });
  if (assets !== void 0) {
    assets.sort((a, b) => a.size - b.size);
    let longestAssetSizeLabel = Math.max.apply(
      null,
      assets.map((a) => stripAnsi(a.sizeLabel).length)
    );
    let shouldBundleSplit = false;

    assets.forEach((asset) => {
      let sizeLabel = asset.sizeLabel;
      let sizeLabelLength = stripAnsi(sizeLabel).length;
      if (sizeLabelLength < longestAssetSizeLabel) {
        let paddingRight = " ".repeat(longestAssetSizeLabel - sizeLabelLength);
        sizeLabel += paddingRight;
      }
      let isMainBundle = asset.name.indexOf("main.") === 0;
      let recommentedSize = isMainBundle ? maxBundleGzipSize : maxChunkGzipSize;
      let isLarge = recommentedSize && asset.size > recommentedSize;

      if (isLarge && path.extname(asset.name) === ".js") {
        shouldBundleSplit = true;
      }

      console.log(
        "  " +
          (isLarge ? chalk.red(sizeLabel) : sizeLabel) +
          "  " +
          chalk.dim(asset.folder + path.sep) +
          chalk.blueBright(asset.name)
      );
    });
    if (shouldBundleSplit) {
      console.log();
      console.log(
        chalk.yellow(
          `Размер пакета значительно превышает допустимый.\nРассмотрите возмжность разделения кода.`
        )
      );
    }
  }
}

function getDifferenceLabel(currentSize: number, prevSize: number) {
  const FIFTEEN_KBS = 1024 * 50;
  const diff = currentSize - prevSize;
  const fileSize = !Number.isNaN(diff) ? filesize(diff) : "0";

  if (diff >= FIFTEEN_KBS) {
    return chalk.red("+", fileSize);
  } else if (diff < FIFTEEN_KBS && diff > 0) {
    return chalk.yellow("+", fileSize);
  } else if (diff < 0) {
    return chalk.green(fileSize);
  } else {
    return "";
  }
}

export { measureFileSizesBeforeBuild, printFileSizesAfterBuild };
