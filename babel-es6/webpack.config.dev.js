const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglify = require('uglifyjs-webpack-plugin');

const addressPath = 'dist'; //打包输出路径
const excludeFile = /(node_modules)/; //排出打包文件夹

//css打包压缩地址
const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
});

console.dir(extractCss);

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, addressPath),
        // publicPath: '/',  //全局加前路径
        filename: 'js/main.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: excludeFile,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                exclude: excludeFile,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|css)$/,
                exclude: excludeFile,
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        minimize: true
                    }
                },{
                    loader: "style-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                exclude: excludeFile,
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: excludeFile,
                options: {
                    limit: 19200,
                    name: 'img/[name].[ext]?[hash]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                exclude: excludeFile,
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]',
                    publicPath: '../'
                }
            }
        ]
    },
    resolve: {
        extensions: ['','.js', '.json', '.vue']
    },
    // resolve: {
    //     extensions: ['.js', '.vue'],
    //     alias: {
    //         components: path.join(__dirname, './src/components')
    //     }
    // },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html', //设置文件名
            title: 'Webpack_index', //设置指定标签内容
            template: path.resolve(__dirname, "src/index.html") //指定html模版文件
        }),
        extractCss,
        new uglify()
    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
    },
    devtool: 'source-map'
}