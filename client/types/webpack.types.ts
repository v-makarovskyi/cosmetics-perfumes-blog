export type WebpackConfiguration = import("webpack").Configuration;
export type WebpackConfigEnv = "development" | "production";

/** type for prompts object. Using in 'utils/browsersHelpers.ts', 'utils/webpackDevServerUtils/-choosePort.ts' */
export type PromptsObjectType = import("prompts").PromptObject;

//type for utils/getProcessForPort
export type ExecFileSyncOptions =
  import("child_process").ExecFileSyncOptionsWithStringEncoding;

export interface AppPaths {
  [x: string]: string | string[];
}

//types for createCompiler func in webpackDevServerUtils.ts
export type CreateCompilerFuncPropsType = {
  Webpack: typeof import("webpack");
  config: import("webpack").Configuration;
  appName: string;
  useTS: boolean;
  urls: {[x: string]: any}
};

export type AppCompiller = import("webpack").Compiler;

//types for webpackFormatMessages.ts
export type AppStatsCompilations = import("webpack").StatsCompilation;
export type AppStatsErrorOrWarning = import("webpack").StatsError;

//types for TsLoaderFormatter.ts -- utils/ts-loader-utils
export interface TsLoaderErrorInfo {
  code: number;
  severity: "error" | "warning";
  content: string;
  file: string;
  line: number;
  character: number;
  context: string;
}


