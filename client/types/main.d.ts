declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    HOST: string;
    PORT: string;
  }
}

declare module "bfj" {
  function write(
    path: string,
    data: object | undefined,
    options?: { [x: string]: any }
  ): Promise<any>;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.avif" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<
    React.SVGProps<SVGAElement> & { title?: string }
  >;
  const value: string;
  export default value;
}
