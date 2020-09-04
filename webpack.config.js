const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    entry: ["./src", "webpack-plugin-serve/client"],
  },
  parts.page({ title: "Training Webpack" }),
]);

const productionConfig = merge([
  parts.extractCSS(),
  parts.eliminateUnusedCSS(),
]);

const developmentConfig = merge([
  parts.devServer(),
  parts.extractCSS({ options: { hmr: true } }),
  parts.eliminateUnusedCSS(),
]);

const getConfig = (mode) => {
  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);