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
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              }
            ],
            less: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          postLoaders: {
            html: "babel-loader?sourceMap"
          },
          sourceMap: true
        }
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
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
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
