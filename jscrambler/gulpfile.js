var gulp = require('gulp');
var uglify = require('gulp-uglify');
 
gulp.task('default', function () {
    gulp.src('src/*.js')
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dist/'));
});