const dev = process.env.NODE_ENV !== 'production';
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new CompressionPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
];

if (!dev) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'webpack-report.html',
    openAnalyzer: false,
  }));
}

module.exports = {
  mode: dev ? 'development' : 'production',
  context: path.join(__dirname, 'src'),
  devtool: dev ? 'none' : 'source-map',
  entry: {
    app: './client.js',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins,
};
