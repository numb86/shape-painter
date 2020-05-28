const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
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
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ];

  const splitChunks = {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  };
  const minimizer = [new TerserPlugin()];
  let optimization = {
    splitChunks,
  };

  if (isProduction) {
    plugins.push(new CleanWebpackPlugin());
    optimization = {
      splitChunks,
      minimizer,
    };
  }

  return {
    devtool: isProduction ? '' : 'source-map',
    context: path.resolve(__dirname, SOURCE_DIR_NAME),
    entry: {
      index: './index.tsx',
    },
    output: {
      path: path.resolve(__dirname, OUTPUT_DIR_NAME),
      filename: isProduction ? '[name].[contentHash].js' : '[name].js',
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
    optimization,
    devServer: {
      contentBase: path.resolve(__dirname, OUTPUT_DIR_NAME),
      hot: true,
      historyApiFallback: {
        rewrites: [{from: /^\//, to: '/index.html'}],
      },
    },
  };
};
