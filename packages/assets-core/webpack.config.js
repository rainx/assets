var path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"] //resolve all the modules other than index.ts
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.ts?$/
      }
    ]
  }
};
