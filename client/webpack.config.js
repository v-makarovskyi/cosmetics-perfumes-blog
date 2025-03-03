const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const resolve = require("resolve");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  output: {
    path: __dirname + "/destination/",
    filename: "bundle.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
  },
  devServer: {
    port: 9000,
    static: [
      {
        directory: path.join(__dirname, 'public/scss')
      },
      {
        directory: path.join(__dirname, 'public/images')
      },
      {
        directory: path.join(__dirname, 'public/fonts')
      }
    ],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: (err) => {
          if (err instanceof DOMException || err.name === "AbortError") {
            return false;
          }
          return true;
        },
      },
      reconnect: 3,
    },
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.join(__dirname, "public/index.html"),
        },
        process.env.NODE
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
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
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        include: __dirname,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@images": path.resolve(__dirname, "public/images/"),
      "@scss": path.relative(__dirname, 'public/scss'),
      "@fonts": path.resolve(__dirname, 'public/fonts')
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
  },
};
