var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('htmlWatch',function(){
    gulp.watch('./dist/*.html',['reload']);
});
gulp.task('jsWatch',function(){
    gulp.watch('./dist/js/*.js',['reload']);
});

gulp.task('connect',function(){
    connect.server({
        port: 3636,
        root:'./dist',
        open: true,
        livereload:true
    })
})

gulp.task('reload', function(){
  gulp.src('./dist/*.html')
      .pipe(connect.reload());
});

gulp.task('default',['connect','htmlWatch','jsWatch'])