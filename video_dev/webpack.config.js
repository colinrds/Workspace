var path=require("path");
var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        s_video: './src/js/s_video.js',
        video_sjk: './src/js/video_sjk.js'
    },
    output: {
        path:path.join(__dirname,"dev"),
        filename:"js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            chunks: ['s_video'],  //指定引入js文件
            template:"./src/index.html"  //指定html模版文件
        }),
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'hls.html',  //设置文件名
            title: 'hls',  //设置指定标签内容
            chunks: ['video_sjk'],  //指定引入js文件
            template:"./src/hls.html"  //指定html模版文件
        }),
        new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
        })
        // new ExtractTextPlugin("[name].css")
    ]
}