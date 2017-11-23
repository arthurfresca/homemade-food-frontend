const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const rootDir = path.resolve(__dirname, "..");

const VENDOR_LIBS = ["react", "react-dom", "prop-types", "react-bootstrap", "superagent", "react-router-dom"];

const config = {
  entry: {
    bundle: ["babel-polyfill", path.resolve(rootDir, "src", "Index")],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(rootDir, "build-dev"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
        include: [/node_modules/, /src/]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "data/[name].[ext]"
            }
          },
          "image-webpack-loader"
        ]
      }
    ]
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
    contentBase: './',
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src/"), "node_modules"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public", "index.html")
    }),
    new CleanWebpackPlugin(["build-dev"], {
      root: path.resolve(rootDir),
      verbose: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      mangle: false,
      sourceMap: true,
      compress: false,
      beautify: true
    })
  ],
  devtool: "eval-source-map"
};

module.exports = config;
