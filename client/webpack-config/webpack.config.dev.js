const webpack = require("webpack");
const commonWebpackConfig = require("./webpack.config");

const webpackDevConfig = commonWebpackConfig("development");

const definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("development"),
  },
});

webpackDevConfig.plugins.push(definePlugin);
webpackDevConfig.cache = true;
webpackDevConfig.devtool = "cheap-module-source-map";

module.exports = webpackDevConfig;
