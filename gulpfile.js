var gulp = require('gulp');
var sass = require('gulp-sass');

//style paths
var sassFiles = 'assets/scss/**/*.scss',
    cssDest = 'assets/css/';

gulp.task('scss', function(){
    gulp.src(sassFiles)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});
gulp.task('sass-watch',function() {
    gulp.watch(sassFiles,['scss']);
});