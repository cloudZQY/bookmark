module.exports = {
    entry: {
        'blank': './src/blank',
    },
    output: {
        path: './bookmark/js',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
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
        { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    devtool: '#cheap-eval-source-map',
};