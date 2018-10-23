const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const minifyCss = require('gulp-minify-css'); //сжимает css
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

gulp.task('html', function () {
    gulp.src('app/*html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});


gulp.task('sass', function () {
    return gulp.src('./app/styles/css.scss')
     .pipe(sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./app/styles/'))
     .pipe(reload({stream: true}));
});

gulp.task('images', function(){
    return gulp.src("./app/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], {
        verbose: true
    }))
    .pipe(gulp.dest('build/images/'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts', function(){
    return gulp.src("./app/fonts/**/*")
    .pipe(gulp.dest('build/fonts/'))
    .pipe(reload({stream: true}));
});

gulp.task('css', function(){
    return gulp.src('./app/styles/css.css')
    .pipe(minifyCss()) // минифицирование css
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream: true}));

});

gulp.task('reload-css', function(){
    runSequence('sass', 'css');
});

gulp.task('browser-sync', function(){
    browserSync({
        startPath: '/',
        server: {
            baseDir: 'build'
        },
        notify: false
    })
});

gulp.task('watch',function(){
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/styles/*.scss', ['reload-css']);
    // gulp.watch('app/images/**/*', ['images']);
});
gulp.task('clean', function(){
    return gulp.src('build')
    .pipe(clean());
})
gulp.task('run', function(){
    runSequence('clean', 'images', 'html','fonts', 'reload-css', 'browser-sync', 'watch');
});

gulp.task('default', ['run']); 