'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

gulp.task('compile-sass', function() {
	return gulp.src('css/main.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(browserSync.stream())
		.pipe(gulp.dest('css'));
});

gulp.task('serve', ['compile-sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("css/**/*.scss", ['compile-sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

// ---------------------------------------------
 
gulp.task('autoprefixer', () =>
    gulp.src('css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
);