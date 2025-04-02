const path = require("path");
const fs = require("fs");
const paths = require("./paths");
const webpack = require("webpack");

//PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_ILINE_SIZE_LIMIT || 10000
);

const useTypeScript = fs.existsSync(paths.appTsConfig);

module.exports = function (webpackEnv) {
  const isEnvDev = webpackEnv === "development";
  const isEnvProd = webpackEnv === "production";

  return {
    target: ["browserslist"],
    stats: "errors-warnings",
    mode: isEnvProd ? "production" : isEnvDev && "development",
    bail: isEnvProd,

    entry: paths.appIndexJs,
    output: {
      path: paths.appBuild,
      pathinfo: isEnvDev,

      // Будет один основной пакет и один файл на асинхронный фрагмент.
      // В разработке не будет создано реальных файлов.
      filename: isEnvProd
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDev && "static/js/bundle.js",
      // Также существуют дополнительные файлы фрагментов JS, если вы используете разделение кода.
      chunkFilename: isEnvProd
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDev && "static/js/[name].chunk.js",
      assetModuleFilename: "cosmetics-perfumes-blog/media/[name].[hash][ext]",
      publicPath: "/",
    },

    resolve: {
      modules: ["node_modules"],
      extensions: paths.moduleFileExtentions
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypeScript || !ext.includes("ts")),
      alias: {
        "@images": path.join(paths.appPublic, "images"),
        "@fonts": path.join(paths.appPublic, "fonts"),
        "@scss": path.join(paths.appPublic, "scss"),
        "@src":  String(paths.appSrc)
      },
    },

    module: {
      rules: [
        // Обработка пакетов node_modules, содержащих исходные карты
        {
          test: /\.(mjs|js|jsx|ts|ts|tsx|css)$/,
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          loader: require.resolve("source-map-loader"),
        },
        {
          test: /\.avif$/,
          type: "asset",
          mimetype: "image/avif",
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
        },
        {
          test: [/\.bmp$/, /\.jpe?g$/, /\.png$/, /\.gif$/],
          type: "asset/resource",
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve("@svgr/webpack"),
              options: {
                prettier: false,
                titleProp: true,
                ref: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(js|mjs|jsx)$/,
          include: paths.appSrc,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
              babelrc: false,
              configFile: false,
            },
          },
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf)$/,
          type: "asset/inline",
        },
        {
          test: /\.(sass|scss|css)$/,
          use: isEnvProd
            ? [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2,
                    sourceMap: false,
                    modules: false,
                  },
                },
                "postcss-loader",
                "sass-loader",
              ]
            : isEnvDev && [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: true,
                    importLoaders: 1,
                    modules: false,
                  },
                },
                { loader: "postcss-loader", options: { sourceMap: true } },
                { loader: "sass-loader", options: { sourceMap: true } },
              ],
        },
      ],
    },

    plugins: [
      isEnvProd &&
        new MiniCssExtractPlugin({
          filename: "styles/[name].[contenthash].css",
          chunkFilename: "[id].css",
        }),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            title: "cosmetics-perfumes-blog",
            template: paths.appIndexHtml,
            inject: true,
          },
          isEnvProd
            ? {
                minify: {
                  removeEmptyAttributes: true,
                  useShortDoctype: true,
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyCSS: true,
                  minifyJs: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
