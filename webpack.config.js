const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  entry: [
    './src/styles/reset.css',
    './src/styles/theme.css',
    './src/styles/main.css',
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
        test: /\.css$/i,
        use: [
          'style-loader',
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
  devtool: 'inline-source-map',
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
