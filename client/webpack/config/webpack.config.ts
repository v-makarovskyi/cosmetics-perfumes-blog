//import core node.js
import path from "path";
import fs from "fs";

//import from node_mpdules
import webpack from "webpack";
import chalk from "chalk";
import resolve from "resolve";

//plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { InterpolateHtmlPlugin } from "../utils/plugins/interpolateHtmlPlugin";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { appPaths } from "./paths";
import { getModules } from "./modules";
import { tsLoaderFormatter } from "../utils/ts-loader-utils/tsLoaderFormatter";
import { createEnvHash } from "../utils/createEnvHash";

import { getClientEnvironment } from "./env";

//types for common config
import {
  WebpackConfiguration,
  WebpackConfigEnv,
} from "../../types/webpack.types";

const useTS = fs.existsSync(appPaths.appTsConfig as string);

//style Regexes and other for styles
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(s[ac]ss)$/;
const sassModuleRegex = /\.module\.(sass|scss)$/;
const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
);

export const config = (webpackEnv: WebpackConfigEnv): WebpackConfiguration => {
  const isDevelopment = webpackEnv === "development";
  const isProduction = webpackEnv === "production";

  const env = getClientEnvironment(
    appPaths.publicUrlOrPath.slice(0, -1) as string
  );
  console.log("env", env.raw);
  const modules = getModules();

  return {
    target: ["browserslist"],
    bail: isProduction,
    mode: isProduction ? "production" : isDevelopment ? "development" : "none",
    devtool: isProduction
      ? "source-map"
      : isDevelopment && "cheap-module-source-map",
    entry: appPaths.appIndex,

    cache: {
      type: "filesystem",
      version: createEnvHash(env.raw),
      store: "pack",
      buildDependencies: {
        defaultWeppack: ["webpack/lib"],
        config: [__filename],
        tsConfig: [
          appPaths.appTsConfig as string,
          appPaths.appJsConfig as string,
        ].filter((f) => fs.existsSync(f)),
      },
      cacheDirectory: appPaths.appWebppackCache as string,
    },

    output: {
      path: appPaths.appBuild as string,
      pathinfo: isDevelopment,
      publicPath: appPaths.publicUrlOrPath as string,
      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : isDevelopment
        ? "static/js/bundle.js"
        : undefined,
      chunkFilename: isProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isDevelopment
        ? "static/js/[name].chunk.js"
        : undefined,
      assetModuleFilename: "static/media/[name].[hash:8][ext]",
      devtoolModuleFilenameTemplate: isProduction
        ? (info: { absoluteResourcePath: string }) =>
            path
              .relative(appPaths.appSrc as string, info.absoluteResourcePath)
              .replace(/\\/g, "/")
        : isDevelopment
        ? (info: { absoluteResourcePath: string }) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
        : undefined,
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: (info: any) => ({
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: true,
              configFile: appPaths.appTsConfig as string,
              errorFormatter: tsLoaderFormatter,
            },
          }),
        },
        {
          test: [/\.webp$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: "static/media/images/[name].[hash:8][ext]",
          },
        },
        {
          test: [/\.avif$/],
          type: "asset",
          mimetype: "image/avif",
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: "static/media/images/[name].[hash:8][ext]",
          },
        },
        {
          test: [/\.jpe?g$/, /\.bmp$/, /\.png$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: "static/media/images/[name].[hash:8][ext]",
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          sideEffects: true,
          use: [
            isDevelopment && require.resolve("style-loader"),
            isProduction && MiniCssExtractPlugin.loader,
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
                url: true,
                import: true,
                modules: false,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                sourceMap: true,
                postcssOptions: {
                  ident: "postcss",
                  config: false,
                  plugins: [
                    "postcss-flexbugs-fixes",
                    [
                      "postcss-preset-env",
                      {
                        stage: 3,
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                      },
                    ],
                    "postcss-normalize",
                  ],
                },
              },
            },
          ],
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          sideEffects: true,
          use: [
            isDevelopment && require.resolve("style-loader"),
            isProduction && MiniCssExtractPlugin.loader,
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 3,
                url: true,
                import: true,
                modules: false,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                sourceMap: true,
                postcssOptions: {
                  ident: "postcss",
                  config: false,
                  plugins: [
                    "postcss-flexbugs-fixes",
                    [
                      "postcss-preset-env",
                      {
                        stage: 3,
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                      },
                    ],
                    "postcss-normalize",
                  ],
                },
              },
            },
            {
              loader: require.resolve("resolve-url-loader"),
              options: {
                sourceMap: true,
                root: appPaths.appSrc,
              },
            },
            {
              loader: require.resolve("sass-loader"),
              options: {
                sourceMap: true,
                implementation: require("sass"),
                sassOptions: {
                  quietDeps: true,
                  silenceDeprecations: ["import"],
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: appPaths.appHtml as string,
            inject: true,
            title: "cosmetic",
          },
          isProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: false,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new webpack.DefinePlugin(env.stringify),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      useTS &&
        new forkTsCheckerWebpackPlugin({
          async: isDevelopment,
          typescript: {
            typescriptPath: resolve.sync("typescript", {
              basedir: appPaths.appNodeModules as string,
            }),
            configOverwrite: {
              compilerOptions: {
                sourceMap: true,
                skipLibCheck: true,
                inlineSourceMap: false,
                declarationMap: false,
                noEmit: true,
                incremental: true,
                tsBuildInfoFile: appPaths.appTsInfoFile as string,
              },
            },
            context: appPaths.appPath as string,
            mode: "write-references",
            diagnosticOptions: {
              syntactic: true,
            },
          },
          issue: {
            include: [{ file: "**/src/**/*.{ts,tsx}" }],
          },
          logger: "webpack-infrastructure"
        }),
    ],

    resolve: {
      modules: ["node_modules", appPaths.appNodeModules as string],
      extensions: Array.isArray(appPaths.moduleExtensions)
        ? appPaths.moduleExtensions
            .map((ext) => `.${ext}`)
            .filter((el) => useTS || !el.includes("ts"))
        : undefined,
      alias: modules.alias,
    },

    infrastructureLogging: {
      level: "error",
    },
    //stats: "errors-warnings",
    stats: "none",
  };
};
