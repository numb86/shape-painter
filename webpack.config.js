const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const SOURCE_DIR_NAME = 'src';
const OUTPUT_DIR_NAME = 'dist';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './template.ts',
      chunks: ['vendors', 'index'],
      scriptLoading: 'defer',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ];

  if (isProduction) {
    plugins.push(new CleanWebpackPlugin());
  }

  return {
    devtool: isProduction ? false : 'eval-source-map',
    context: path.resolve(__dirname, SOURCE_DIR_NAME),
    entry: {
      index: './index.tsx',
    },
    output: {
      path: path.resolve(__dirname, OUTPUT_DIR_NAME),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {test: /\.*(ts|tsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {loader: 'react-svg-loader', options: {jsx: true}},
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, SOURCE_DIR_NAME),
        '@shared': path.resolve(__dirname, `${SOURCE_DIR_NAME}/shared`),
        '@svg': path.resolve(__dirname, `${SOURCE_DIR_NAME}/svg`),
        '@tree': path.resolve(__dirname, `${SOURCE_DIR_NAME}/tree`),
        '@clientServer': path.resolve(
          __dirname,
          `${SOURCE_DIR_NAME}/clientServer`
        ),
      },
    },
    plugins,
    optimization: {
      chunkIds: 'named',
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      contentBase: path.resolve(__dirname, OUTPUT_DIR_NAME),
      hot: true,
      historyApiFallback: {
        rewrites: [{from: /^\//, to: '/index.html'}],
      },
    },
  };
};
