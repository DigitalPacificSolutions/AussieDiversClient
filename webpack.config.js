var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve('src/js'),
  entry: "./app.js",
  output: {
    path: path.resolve("dist/"),
    publicPath: "/",
    filename: "js/bundle.js"
  },
  devServer: {
    //contentBase: "public"
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file?name=fonts/[hash].[ext]"
      },
      {
        test: require.resolve('bootstrap-sass'),
        loader: "imports?jQuery=jquery"
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.html$/,
        loader: ExtractTextPlugin.extract("html")
      },
      {
        test: /\.(png|gif|jpg|jpeg|ico)$/,
        loader: "url?limit=10000&name=images/[hash].[ext]"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("index.html")
  ]
}
