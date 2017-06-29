var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js',
        list: './src/js/list.js'
    },
    output: {
        path: __dirname + '/dev/',
        filename: 'js/[name].bundle.js'
    },
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
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['index'],  //指定引入js文件
            template:"./src/index.html"  //指定html模版文件
        }),
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'list.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['list'],  //指定引入js文件
            template:"./src/list.html"  //指定html模版文件
        }),
        new ExtractTextPlugin("./css/[name].css")
    ]
}