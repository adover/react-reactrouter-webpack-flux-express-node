var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

const PORT = process.env.DEV_PORT || 8080;

console.log('Building for environment: ' + process.env.NODE_ENV);

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    './src/client/entry',
    './scss/main.scss'
  ],
  output: {
    path: __dirname + '/js',
    filename: 'app.js',
    publicPath: 'http://localhost:' + PORT + '/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/style.css', {
        allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
        {
            test: require.resolve('react'),
            loader: 'expose?React'
        },
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/octet-stream"
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=image/svg+xml"
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
            // loader: ExtractTextPlugin.extract('css!sass')
        }
    ]
  }
}
