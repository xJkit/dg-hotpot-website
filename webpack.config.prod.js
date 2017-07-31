const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

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
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.sass$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    extractHtml,
    extractCss,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ],
};