import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const client = {
  watch: true,
  devtool: 'source-map',
  entry: {
    bundle: ['babel-polyfill', './client.js']
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  output: {
    path: path.join(__dirname, 'client', 'static'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap') }
    ]
    /*
    rules: [
      {
        test: path.join(__dirname, 'client'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],*/
  },
};

const server = {
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals({
    modulesFromFile: true,
  })],
  entry: {
    bundle: ['babel-polyfill', './server.js'],
  },
  output: {
    path: path.join(__dirname, ''),
    filename: 'server-es5.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, ''),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
};

export default [client, server];
