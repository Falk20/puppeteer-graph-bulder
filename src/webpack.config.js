const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./src/logic.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "../public"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
];
