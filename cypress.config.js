const { defineConfig } = require('cypress');

const webpackConfig = require('./webpack.dev.js')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    },
  },
});
