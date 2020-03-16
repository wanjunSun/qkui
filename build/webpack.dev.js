const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const devConfig = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: "dist",
    hot: true
  },
  devtool: "inline-source-map"
}

module.exports = merge(devConfig, common)
