var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var uglifyJS = require('gulp-uglify');
var pump = require('pump');
var concatJS = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var image = require('gulp-image');

gulp.task('CSS', function () {
    return gulp.src(['src/dist/css/*.css' , 'src/assets/css/src/docs.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concatCSS("bundle.css"))
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('uglifyJS', function (cb) {
    pump([
            gulp.src('src/dist/js/bootstrap.js'),
            uglifyJS(),
            gulp.dest('src/dist/js')
        ],
        cb
    );
});

gulp.task('concatJS', function() {
    return gulp.src('src/dist/js/*.js')
        .pipe(concatJS('bundle.js'))
        .pipe(gulp.dest('src/dist/js'));
});

gulp.task('image', function() {
    gulp.src('src/assets/img/*')
        .pipe(image())
        .pipe(gulp.dest('src/assets/img/'));
});



gulp.task('JS' , ['uglifyJS' , 'concatJS']);
