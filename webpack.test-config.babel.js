const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      {
        loader: 'raw',
        test: /\.(css|html)$/
      },
      {
        loaders: ['babel-loader', 'ts-loader'],
        test: /\.tsx$|\.ts$/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('.', 'src')
  },
  plugins: [
    new WebpackNotifierPlugin({title: 'Webpack Tests', noisy: true}),
  ],
  externals: {
    // Fix for Typings
    console: '{}',
    fs: '{}',
    net: '{}',
    tls: '{}',
    // Enzyme Externals
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
