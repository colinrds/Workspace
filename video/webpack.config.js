var path=require("path");
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/js/hls.js',
        './src/js/videojs-hlsjs.js',
        './src/js/video.js'
    ],
    output: {
        path:path.join(__dirname,"dist"),
        filename:"js/bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'video-home',  //设置指定标签内容
            template:"./src/index.html"  //指定html模版文件
        }),
    ],
}