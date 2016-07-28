var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');

module.exports = function(args) {

	gulp.task('fullPage:main', function() {
		var isProduction = args.production;

		return gulp.src(['./app/assets/javascript/fullPage.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulpif(isProduction, uglify()))
			.pipe(gulpif(isProduction, rename('fullPage.min.js')))
			.pipe(gulp.dest('./dist/assets/javascript/'));

	});

	gulp.task('script:main', function() {
		var isProduction = args.production;

		return gulp.src(['./app/assets/javascript/script.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulpif(isProduction, uglify()))
			.pipe(gulpif(isProduction, rename('script.min.js')))
			.pipe(gulp.dest('./dist/assets/javascript/'));

	});

	gulp.task('javascript', ['fullPage:main', 'script:main']);

};
