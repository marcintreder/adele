const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => {
  const isProduction = env.production === true;

  return {
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist/public'),
      filename: 'bundle.js',
    },
    resolve: {
      modules: [__dirname, 'node_modules'],
      extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      compress: false,
    },
    module: {
      rules: [
        {
          use: ['babel-loader', 'eslint-loader'],
          test: /\.jsx?$/,
          exclude: /node_modules/,
        },
        {
          use: ['file-loader'],
          test: /\.(jpe?g|png|gif)$/i,
        },
        {
          use: ['raw-loader'],
          test: /\.svg$/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: './src/assets/favicon.ico',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './robots.txt', to: './' },
          { from: './src/assets/twitter_image.jpg', to: './' },
        ],
      }),
    ],
  };
};
