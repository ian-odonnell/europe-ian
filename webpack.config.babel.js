import path from 'path';
import nodeExternals from 'webpack-node-externals';

const client = {
  watch: true,
  entry: {
    js: ['babel-polyfill', './client.js'],
  },
  output: {
    path: path.join(__dirname, 'client', 'static', 'js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.js$/, include: [/whatwg-.*/], loaders: ['babel-loader'] }
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
    js: ['babel-polyfill', './server.js'],
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
