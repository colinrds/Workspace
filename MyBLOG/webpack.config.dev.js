var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path=require("path");

module.exports = {
    entry: { 
        webpack:'webpack-dev-server/client?http://localhost:8585/',
        index:'./src/main.js'
    },
    output: {
        path:path.join(__dirname,"dist"),
        filename: 'js/[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', 
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.(png|jpg)$/,
　　　　　　      loader: 'url-loader?limit=8192000&name=../img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            // chunks: ['app'],  //指定引入js文件
            template: "./view/index.html"  //指定html模版文件
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new ExtractTextPlugin("./css/[name].css")
    ],
    devServer: {
        contentBase: './dist'
    }
}