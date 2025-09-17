export type WebpackConfiguration = import("webpack").Configuration;
export type WebpackConfigEnv = "development" | "production"

//type for prompts object. Using in 'utils/browsersHelpers.ts'
export type PromptsObjectType = import('prompts').PromptObject

export interface AppPaths {
    [x: string]: string | string[]
}