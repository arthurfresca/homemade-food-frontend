const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const package = require("../package.json");

const rootDir = path.resolve(__dirname, "..");


const config = {
  entry: {
    bundle: ["babel-polyfill", path.resolve(rootDir, "src", "Index")],
    vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.resolve(rootDir, "build-prod"),
    filename: "[name].[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
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
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src/"), "node_modules"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"],
      filename: "[name].[chunkhash:8].js"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public", "index.html"),
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].[hash:8].css"
    }),
    new CleanWebpackPlugin(["build-prod"], {
      root: path.resolve(rootDir),
      verbose: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: true
    }),
    new ManifestPlugin()
  ],
  devtool: "source-map"
};

module.exports = config;
