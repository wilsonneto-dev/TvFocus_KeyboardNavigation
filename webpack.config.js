var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'development',
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js.bundle.js'
  },
  
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: './style/bundle.css' })
  ],
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: /*'style-loader'*/ MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }

};

