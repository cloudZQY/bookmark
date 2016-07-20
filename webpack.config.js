const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'blank': './src/blank',
    },
    output: {
        path: './bookmark/js',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
    resolve: {
        alias: {
            'util': 'src/blank/util',
        },
        modulesDirectories: [
          '',
          'node_modules'
        ],
    },
    module: {
      loaders:[
        {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        {test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")},
      ]
    },
    devtool: 'eval',
};