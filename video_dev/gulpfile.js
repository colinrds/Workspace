var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('htmlWatch',function(){
    gulp.watch('./dev/*.html',['reload']);
});
gulp.task('jsWatch',function(){
    gulp.watch('./dev/js/*.js',['reload']);
});
gulp.task('cssWatch',function(){
    gulp.watch('./dev/css/*.css',['reload']);
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

gulp.task('dev',['connect','htmlWatch','jsWatch','cssWatch'])