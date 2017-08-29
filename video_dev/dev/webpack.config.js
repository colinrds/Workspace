var path = require('path');

module.exports = {
  entry: {
    index: './level/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['css', 'sass?includePaths[]=' +
        path.resolve(__dirname, './node_modules/compass-mixins/lib') +
        '&includePaths[]=' +
        path.resolve(__dirname, './node_modules/clappr/src/base/scss') +
        '&includePaths[]=' +
        path.resolve(__dirname, './src/base/scss')
      ],
      include: path.resolve(__dirname, 'src'),
    }]
  }
}