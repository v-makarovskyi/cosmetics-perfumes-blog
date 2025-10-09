import { appPaths } from "./paths";
import { type Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";


function createWebpackDevServerConfig(allowedHost: string): WebpackDevServerConfiguration {
  return {
    allowedHosts: [allowedHost],
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    static: {
      directory: appPaths.appPublic as string,
      publicPath: [appPaths.publicUrlOrPath as string],
    },
    client: {
      overlay: false,
    },
    historyApiFallback: true,
    devMiddleware: {
        publicPath: appPaths.publicUrlOrPath.slice(0, -1) as string
    }
  };
}

export { createWebpackDevServerConfig };
