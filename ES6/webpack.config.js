var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/js/main.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'js/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: 'es2015',
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}