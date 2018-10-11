const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const runSequence = require('run-sequence');



gulp.task('html', function () {
    gulp.src('app/components/*html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});

gulp.task('sass', function () {
    return gulp.src('./app/styles/css.scss')
     .pipe(sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./app/styles/'));
});

gulp.task('css', function(){
    return gulp.src("./app/styles/css.css")
    .pipe(gulp.dest('build/css/'))
})

gulp.task('run', function(){
    runSequence('html', 'sass', 'css');
})

gulp.task('default', ['run'])   