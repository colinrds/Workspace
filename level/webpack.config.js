var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname,"dist"),
        filename: 'js/bundle.js'
    }, 
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}