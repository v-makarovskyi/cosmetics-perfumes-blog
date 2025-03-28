const webpack = require("webpack");
const commonWebpackConfig = require("./webpack.config");

const webpackProdConfig = commonWebpackConfig("production");

const definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production"),
  },
});

webpackProdConfig.plugins.push(definePlugin)

module.exports = webpackProdConfig;