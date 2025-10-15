//import core node.js
import path from "path";
import fs from "fs";

//import from node_mpdules
import webpack from "webpack";
import chalk from "chalk";
import resolve from "resolve";

//plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { InterpolateHtmlPlugin } from "../utils/plugins/interpolateHtmlPlugin";
import forkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import EslintWebpackPlugin from "eslint-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import { appPaths } from "./paths";
import { getModules } from "./modules";
import { tsLoaderFormatter } from "../utils/ts-loader-utils/tsLoaderFormatter";
import { createEnvHash } from "../utils/createEnvHash";
import { eslintFormatter } from "../utils/lint-utils/eslintFormatter";

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
      cacheDirectory: appPaths.appWebpackCache as string,
    },

    output: {
      path: appPaths.appBuild as string,
      pathinfo: isDevelopment,
      publicPath: appPaths.publicUrlOrPath as string,

      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : isDevelopment
        ? "static/js/[name].js"
        : undefined,

      chunkFilename: isProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isDevelopment
        ? "static/js/[name].chunk.js"
        : undefined,

      assetModuleFilename: "static/media/[name].[hash][ext]",
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
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          enforce: "pre",
          loader: require.resolve("source-map-loader"),
        },
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
          test: /\.(ttf|otf|woff|woff2)$/,
          type: "asset",
          generator: {
            filename: "static/media/fonts/[name].[hash:8][ext]",
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
          test: /\.svg$/,
          type: "asset/inline",
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
          logger: "webpack-infrastructure",
        }),

      /*   new EslintWebpackPlugin({
        extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        context: appPaths.appSrc as string,
        eslintPath: require.resolve("eslint"),
        configType: "flat",
        cache: true,
        cacheLocation: path.resolve(
          appPaths.appNodeModules as string,
          ".cache/.eslintcache"
        ),
        formatter: eslintFormatter,
        cwd: appPaths.appSrc as string,
      }), */
    ],

    optimization: {
      minimize: isProduction,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 10000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name(
              module: webpack.Module,
              chunks: webpack.Chunk,
              casheGroupKey: string
            ) {
              const packageName =
                module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/) ??
                "package";
              return `${casheGroupKey}~npm.${packageName[1].replace("@", "")}`;
            },
          },
        },
      },

      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 2020,
            },
            compress: {
              ecma: 5,
              comparisons: false,
              dead_code: true,
              directives: true,
              drop_debugger: true,
              drop_console: ["debug", "info"],
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },

    resolve: {
      modules: ["node_modules", appPaths.appNodeModules as string].concat(
        modules.additionalModulePath || []
      ),
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
    performance: false,
  };
};
