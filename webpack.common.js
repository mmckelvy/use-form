const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  entry: {
    app: path.join(__dirname, 'examples/app/frontend/js/src/index.js'),
  },
  resolve: {
    alias: {
      views: path.join(__dirname, 'examples/app/frontend/js/src/views'),
      components: path.join(
        __dirname,
        'examples/app/frontend/js/src/components'
      ),
      useForm: path.join(
        __dirname,
        'examples/app/frontend/js/src/use-form.js'
      ),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'examples/app/views/src/index.html'),
      filename: path.join(__dirname, 'examples/app/views/dist/index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'examples/app/frontend/js/src'),
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        include: path.join(__dirname, 'examples/app/frontend/js/src'),
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  }
};

module.exports = common;
