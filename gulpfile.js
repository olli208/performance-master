var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var uglifyJS = require('gulp-uglify');
var pump = require('pump');

gulp.task('CSS', function () {
    return gulp.src(['src/dist/css/*.css' , 'src/assets/css/src/docs.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concatCSS("bundle.css"))
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('JS', function (cb) {
    pump([
            gulp.src('src/dist/js/bootstrap.js'),
            uglifyJS(),
            gulp.dest('src/dist/js')
        ],
        cb
    );
});

