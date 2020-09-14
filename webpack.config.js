const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoaders = [parts.tailwind()];

const commonConfig = merge([
  {
    entry: ["./src", "webpack-plugin-serve/client"],
  },
  parts.page({ title: "Training Webpack" }),
  parts.loadImages(),
]);

const productionConfig = merge([
  parts.extractCSS({ loaders: cssLoaders }),
  parts.eliminateUnusedCSS(),
  parts.loadJavaScript(),
  parts.generateSourceMaps({ type: "source-map" }),
  {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
]);

const developmentConfig = merge([
  parts.devServer(),
  parts.extractCSS({ options: { hmr: true }, loaders: cssLoaders }),
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