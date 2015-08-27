var path = require('path');
var gulp = require('gulp');

// Gulp plugins are attached to the gulp namespace for easy access and context.
gulp.angularFilesort = require('gulp-angular-filesort');
gulp.concat = require('gulp-concat');
gulp.ngAnnotate = require('gulp-ng-annotate');
gulp.rename = require('gulp-rename');
gulp.uglify = require('gulp-uglify');
gulp.concatUtil = require('gulp-concat-util');

gulp.task('build', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.angularFilesort())
    .pipe(gulp.ngAnnotate())
    .pipe(gulp.concat('angular-spinners.js'))
    .pipe(gulp.concatUtil.header(
      '/* commonjs package manager support (eg componentjs) */\n' +
      'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){\n' +
      '  module.exports = \'angularSpinners\';\n' +
      '}\n\n' +
      '(function (window, angular, undefined) {\n'
    ))
    .pipe(gulp.concatUtil.footer('})(window, window.angular);'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.uglify())
    .pipe(gulp.rename('angular-spinners.min.js'))
    .pipe(gulp.dest('./dist/'));
});
