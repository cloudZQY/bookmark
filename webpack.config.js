module.exports = {
    entry: {
        'blank': './src/blank/index.jsx',
        'popup': './src/popup',
    },
    output: {
        path: './bookmark/js',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
      loaders:[
        { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    devtool: 'source-map',
};