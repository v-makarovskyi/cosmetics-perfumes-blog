import fs from "fs";
import dotenvx from "@dotenvx/dotenvx";
import chalk from "chalk";
import { appPaths } from "./paths";

const NODE_ENV = process.env.NODE_ENV;


if (!NODE_ENV) {
  throw new Error(
    chalk.red.bold(
      `Переменная среды ${chalk.underline(
        "NODE_ENV"
      )} требуется, но не была указана`
    )
  );
}

const dotenvFiles = [
  `${appPaths.dotenv}.${NODE_ENV}.local`,
  appPaths.dotenv,
].filter(Boolean);

dotenvFiles.forEach((filepath) => {
  return dotenvx.config({
    path: filepath,
    logLevel: "error"
  });
});

const P_C_BLOG = /^P_C_BLOG_/i;

function getClientEnvironment(publicUrl: string) {
  const raw = Object.keys(process.env)
    .filter((key) => P_C_BLOG.test(key))
    .reduce(
      (env: { [x: string]: any }, key: string) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || "development",
        PUBLIC_URL: publicUrl,
      }
    );

  const stringify = {
    "process.env": Object.keys(raw).reduce(
      (env: { [x: string]: any }, key: string) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      },
      {}
    ),
  };

  return {
    raw,
    stringify,
  };
}

export { getClientEnvironment };
