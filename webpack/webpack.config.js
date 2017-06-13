const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => {
  const ExtractSASS = new ExtractTextPlugin(`/styles/${options.cssFileName}`);
  const apiHost = process.env.apiHost || 'https://console.supply.ai';
  //const apiHost = process.env.apiHost || 'https://api.dataculture.io';
  const clientID = process.env.clientID || 'J7O4qUmB2F7lZ3hZSWmbbaYx1WppwQBKqpKXxnhu';
  const clientSecret = process.env.clientSecret || 'CaRErPwqOpX4iv6INECQM7uV1UQyzeSLBNg0DaO3rJGbs0aQ7bQoN0gGQ9oAwyWDQNze4eHjqQacwyX7JaRpcigwzatvbRmVXtRXaOAoa4LrlTZAEn7lIziWnEFaeXsN';

  const webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${+ options.port}`,
      'webpack/hot/dev-server',
      Path.join(__dirname, '../src/app/index'),
    ],
    output: {
      path: Path.join(__dirname, '../dist'),
      filename: `/scripts/${options.jsFileName}`,
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          include: Path.join(__dirname, '../src/app'),
          loader: 'babel',
        },
      ],
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development'),
        },
        __API__: JSON.stringify(apiHost),
        __CLIENT_ID__: JSON.stringify(clientID),
        __CLIENT_SECRET__: JSON.stringify(clientSecret),
      }),
      new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../src/index.html'),
      }),
      new CopyWebpackPlugin([
        { from: 'static', to: 'static' },
      ]),
    ],
  };

  if (options.isProduction) {
    webpackConfig.entry = [Path.join(__dirname, '../src/app/index')];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: ExtractSASS.extract(['css', 'sass']),
    });
  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    });

    webpackConfig.devServer = {
      contentBase: Path.join(__dirname, '../'),
      hot: true,
      port: options.port,
      inline: true,
      progress: true,
      historyApiFallback: true,
    };
  }

  return webpackConfig;
};
