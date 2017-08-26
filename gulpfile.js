'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

/**
 * task that concatenates all the scripts
 */
gulp.task('scripts', () => {
  return gulp.src(['./assets/scripts/src/jquery-3.2.1.slim.js', './assets/scripts/src/popper.js', './assets/scripts/src/bootstrap.js', './assets/scripts/src/prism.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./assets/scripts/'));
});

const minify = require('gulp-minify');

/**
 * task that minifies all the scripts
 */
gulp.task('minify', () => {
  gulp.src('./assets/scripts/main.js')
    .pipe(minify({
        ext:{
            //src:'-debug.js',
            min:'.min.js'
        },
        //exclude: ['tasks'],
        //ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./assets/scripts/dist'))
});

const sass = require('gulp-sass');

/**
 * task that compiles all sass to css
 */
gulp.task('sass', () => {
  return gulp.src('./assets/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

const cleanCSS = require('gulp-clean-css');

/**
 * task that minifies the compiled css
 */
gulp.task('minify-css', () => {
  return gulp.src('./assets/stylesheets/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/stylesheets/dist'));
});
