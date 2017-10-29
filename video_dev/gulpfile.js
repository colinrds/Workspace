var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('htmlWatch',function(){
    gulp.watch('./dev/*.html',['reload']);
});
gulp.task('jsWatch',function(){
    gulp.watch('./dev/js/*.js',['uglify','reload']);
});
gulp.task('cssWatch',function(){
    gulp.watch('./dev/css/*.css',['reload']);
});

gulp.task('uglify', function () {
    gulp.src('src/js/clappr.js')
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dev/dist/'));
});

gulp.task('connect',function(){
    connect.server({
        port: 80,
        root:'./dev',
        host: 'dev.sanjieke.cn',
        open: true,
        livereload:true
    })
})

gulp.task('reload', function(){
  gulp.src('./dev/*.html')
      .pipe(connect.reload());
});

gulp.task('default',['connect','htmlWatch','jsWatch','cssWatch'])