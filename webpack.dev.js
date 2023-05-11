const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'demo/app/frontend/js/dist'),
    filename: '[name].js',
    publicPath: '/frontend/js/dist'
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css'}),
  ]
});
