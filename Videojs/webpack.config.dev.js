var path=require("path");
var webpack=require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        'webpack/hot/only-dev-server',
        './src/js/mian.js',
        './src/js/index.js'
    ],
    output: {
        path:path.join(__dirname,"dist"),
        filename:"js/bundle.js"
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
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            // inject: 'head',  //嵌入到某个标签
            filename: 'index.html',  //设置文件名
            title: 'Webpack_index',  //设置指定标签内容
            // chunks: ['index'],  //指定引入js文件
            template:"./src/index.html"  //指定html模版文件
        }),
        // new htmlWebpackPlugin({
        //     // inject: 'head',  //嵌入到某个标签
        //     filename: 'list.html',  //设置文件名
        //     title: 'Webpack_list',  //设置指定标签内容
        //     chunks: ['main'],  //指定引入js文件
        //     template:"./src/list.html"  //指定html模版文件
        // })
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}