const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    gulp.src('./public/es6/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./public/dist'));

    gulp.src('./es6/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist'));
});