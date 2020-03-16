const path = require("path")
const merge = require("webpack-merge")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const common = require("./webpack.common.js")
const prodConfig = {
  mode: "development",
  entry: {
    app: "/public/index.html"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
}
module.exports = merge(prodConfig, common)
