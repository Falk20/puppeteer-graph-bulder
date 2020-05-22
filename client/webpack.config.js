const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: "./client/logic.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "../server/public"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "client/index.html",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
];
