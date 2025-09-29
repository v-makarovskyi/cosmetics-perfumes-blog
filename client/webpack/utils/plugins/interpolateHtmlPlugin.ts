import webpack, { type Compiler } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import escapeStringRegexp from "escape-string-regexp";

class InterpolateHtmlPlugin {
  htmlWebpackPlugin: typeof HtmlWebpackPlugin;
  replacement: { [key: string]: string };

  constructor(
    htmlWebpackPlugin: typeof HtmlWebpackPlugin,
    replacement: { [key: string]: string }
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.replacement = replacement;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("InterpolateHtmlPlugin", (compilation) => {
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap("InterpolateHtmlPlugin", (data) => {
          Object.keys(this.replacement).forEach((key) => {
            const value = this.replacement[key];
            data.html = data.html.replace(
              new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
              value
            );
          });
          return data;
        });
    });
  }
}

export { InterpolateHtmlPlugin };
