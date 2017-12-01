var path=require("path");
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var pathUrl = 'home'

module.exports = {
    entry: { 
        index: [
            './static/home/js/index.js'
        ]
    },
    output: {
        path:path.join(__dirname,"dist"),
        publicPath: '..',
        filename: pathUrl+'/js/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,  //所有.js文件
                exclude: /(node_modules|dist)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
//             {
//                 test: /\.html$/,
//                 loader: 'html-withimg-loader'
//             },
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
//             },
//             {
//                 test: /\.(png|jpg)$/,
// 　　　　　　      loader: 'url-loader?limit=8192&name=/img/[name].[ext]'
//             }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: './home/index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['index'],  //指定引入js文件
            template: "./view/"+pathUrl+"/index.html"  //指定html模版文件
        }),
        // new ExtractTextPlugin("css/[name].css")
    ]
}