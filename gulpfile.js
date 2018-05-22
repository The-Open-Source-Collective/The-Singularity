var gulp = require('gulp');
var del = require("del");

gulp.task('module-configs', function () {
    return gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(){
    return del(['dist/*', '!dist/', '!dist/config.json', "!dist/gcloud.json"]);
});