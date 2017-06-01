
var gulp = require("gulp"),
    // util = require("gulp-util"),
    sass = require("gulp-sass"),
    // autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

// paths
var srcPath = 'src/';
var scssPath = srcPath + 'scss/';
var webPath = 'web/';
var cssPath = webPath + 'css/';

gulp.task('sass', function() {
    return gulp.src(scssPath + 'screen.scss')
        .pipe(sass({ style: 'expanded' }))
        // .pipe(autoprefixer("last 2 version","safari 5", "ie 8", "ie 9"))
        .pipe(gulp.dest(cssPath))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(cssPath))
});

// Default task
gulp.task('default', function() {
    gulp.run('sass');
    gulp.watch(scssPath + '**', function(event) {
        gulp.run('sass');
    })
});