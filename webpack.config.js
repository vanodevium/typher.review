const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  stats: "errors-only",
  context: "./src",
  entry: "./app.js",
  output: {
    path: "./dist",
    filename: "app.[contenthash].js",
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./.nojekyll", to: "." },
        { from: "./*.webmanifest", to: "." },
        { from: "./*.png", to: "." },
        { from: "./*.ico", to: "." },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
    port: 1234,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
