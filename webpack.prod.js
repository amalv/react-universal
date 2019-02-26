const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const plugins = [
  new CleanWebpackPlugin(["dist"]),
  new FriendlyErrorsWebpackPlugin(),
  new CompressionPlugin(),
  new HtmlWebpackPlugin({
    template: "index.html",
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "webpack-report.html",
    openAnalyzer: false,
  }),
  new webpack.DefinePlugin({
    "process.env.GOOGLE_CLIENT_ID": JSON.stringify(
      process.env.GOOGLE_CLIENT_ID
    ),
  }),
];

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    app: "./client.js",
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins,
};
