var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8585/',
            './src/js/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,  //所有.js文件
                exclude: /node_modules/,  //排除目录
                loader: 'babel-loader',  //babel官网看文档：http://babeljs.io/
                query: {
                    presets: ['es2015']
                }
            },
            { 
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['app'],  //指定引入js文件
            template: "./src/index.html"  //指定html模版文件
        }),
    ]
}