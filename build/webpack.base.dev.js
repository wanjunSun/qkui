const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  mode: "development",
  entry: {
    main: "./examples/main",
    vendors: ["vue", "vue-router"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: "dist",
    compress: true, // 是否压缩
    port: 9000, // 启动服务端口
    hot: true, // 是否自动刷新
    open: true // 是否启动服务后，自动打开浏览器
  },
  module: {
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          sourceMap: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".vue"]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Title",
      template: "./examples/index.html"
    }),
    new VueLoaderPlugin()
  ]
}
