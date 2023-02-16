const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    target: 'web',
    entry: [
      './src/styles/reset.css',
      './src/styles/theme.css',
      './src/styles/main.css',
      './src/styles/helpers.css',
      './src/index.tsx',
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/components'),
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]-[local]-[hash:base64:4]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/styles'),
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
        title: isDev ? 'GrooveApp [DEV]' : 'GrooveApp',
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: 'public' }],
      }),
    ],
    optimization: {
      minimizer: [
        `...`, // to extend existing minimizers (i.e. `terser-webpack-plugin`)
        new CssMinimizerPlugin(),
      ],
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: {
      compress: false,
      historyApiFallback: true,
      hot: true,
      port: 3333,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
  };
};
