var path = require("path");
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:8585/',
            './src/js/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'js/index.js'
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
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=819200000&name=/img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['index'],  //指定引入js文件
            template: "./view/index.html"  //指定html模版文件
        }),
        new ExtractTextPlugin("css/[name].css")
    ],
    devServer: {
        contentBase: './dist'
    }
}