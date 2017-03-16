var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var uglifyJS = require('gulp-uglify');
var pump = require('pump');
var concatJS = require('gulp-concat');
var image = require('gulp-image');
var webp = require('gulp-webp');

gulp.task('CSS', function () {
    return gulp.src(['src/dist/css/fonts.css' , 'src/dist/css/bootstrap.css' , 'src/assets/css/src/docs.css'])
        .pipe(concatCSS("bundle.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('crit', function () {
    return gulp.src('src/dist/css/crit-css.css')
        .pipe(concatCSS("crit-css.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('uglifyJS', function (cb) {
    pump([
            gulp.src('src/dist/js/bundle.js'),
            uglifyJS(),
            gulp.dest('src/dist/js')
        ],
        cb
    );
});

gulp.task('concatJS', function() {
    return gulp.src(['src/assets/js/vendor/jquery.min.js' , 'src/dist/js/bootstrap.js'])
        .pipe(concatJS('bundle.js'))
        .pipe(gulp.dest('src/dist/js'));
});

gulp.task('image', function() {
    gulp.src('src/assets/img/*')
        .pipe(image())
        .pipe(gulp.dest('src/assets/img/'));
});

gulp.task('webp', function () {
    return gulp.src('src/assets/img/*')
        .pipe(webp())
        .pipe(gulp.dest('src/assets/img/webp/'));
});


gulp.task('JS' , ['concatJS' , 'uglifyJS']);
gulp.task('images' , ['image' , 'webp']);
gulp.task('default' , ['JS' , 'CSS' , 'images']);