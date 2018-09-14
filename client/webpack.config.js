var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  context: __dirname, //path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ['babel-polyfill', "./src/js/client.js"],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './src/js/worker.js'),
    }),
  ],
};
