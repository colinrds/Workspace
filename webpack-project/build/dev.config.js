const path = require('path');
const webpack = require('webpack');

// webpack({
//     entry: {
//         home: path.resolve('static/home/js/index.js')
//     },
//     output: {
//         path: path.resolve('dist'),
//         filename: 'home/js/bundle.js'
//     }
// }, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log('webpack打包错误:',err.details);
//         return;
//     }
//     console.log('webpack打包完成！');
// });


// var compiler = webpack({
//     entry: {
//         home: path.resolve('static/home/js/index.js')
//     },
//     output: {
//         path: path.resolve('dist'),
//         filename: 'home/js/bundle.js'
//     }
// });

// var watching = compiler.watch({
// /* watchOptions */
// }, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log('webpack监听错误:',err.details);
//         return;
//     }
//     console.log('webpack监听更新完成');
// });