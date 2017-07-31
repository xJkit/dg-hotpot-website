const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractHtml = new ExtractTextPlugin('[name].html');
const extractCss = new ExtractTextPlugin('style.css');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'views', 'index.pug'),
    about: path.join(__dirname, 'src', 'views', 'about.pug'),
    menu: path.join(__dirname, 'src', 'views', 'menu.pug'),
    affiliate: path.join(__dirname, 'src', 'views', 'affiliate.pug'),
    contact: path.join(__dirname, 'src', 'views', 'contact.pug'),
    main: path.join(__dirname, 'src', 'main.js'),
    style: path.join(__dirname, 'src', 'styles', 'main.sass'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3000',
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: ['css-loader?souceMap'],
        }),
      },
      {
        test: /\.sass$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.pug$/,
        use: extractHtml.extract({
          use: ['html-loader', 'pug-html-loader'],
        })
      },
      {
        test: [/\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      "node_modules",
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    extractHtml,
    extractCss,
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3000,
  },
};