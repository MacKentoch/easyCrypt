'use strict';

import webpack      from 'webpack';
import path         from 'path';
import autoprefixer from 'autoprefixer';
import precss       from 'precss';

const assetsDir       = path.resolve(__dirname, 'dist/js');
const nodeModulesDir  = path.resolve(__dirname, 'node_modules');

const config = {
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: assetsDir,
    filename: 'easyCrypt.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [nodeModulesDir]
    }, {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  plugins: [
    getImplicitGlobals(),
    setNodeEnv()
  ]
};

function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    forge: 'node-forge'
  });
}
function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  });
}

export default config;
