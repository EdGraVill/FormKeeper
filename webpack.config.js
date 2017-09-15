const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV === 'production';

const common = {
  entry: [
    'babel-polyfill',
    './src/main.js',
  ],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FormKeeper',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'formKeeper.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'flow'],
        },
      },
    ],
  },
};

const production = {
  plugins: [
    new UglifyJSPlugin(),
  ],
};

const dev = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
};

module.exports = merge(common, env ? production : dev);
