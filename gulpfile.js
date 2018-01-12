var gulp = require('gulp');
var merge = require('merge-stream');

var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var pump = require('pump');
var uglify = require('gulp-uglify');

gulp.task('clean', function(){
	return gulp.src(['dest', 'release', 'development'])
		.pipe(clean())
});

gulp.task('js', function() {
	return gulp.src('src/ts/**/*.ts')
		.pipe(ts())
		.pipe(gulp.dest('dest/js'))
});

gulp.task('css', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dest/css'))
});

gulp.task('concat-js', ['js'], function(){
	return gulp.src('dest/js/**/*.js')
    	.pipe(concat('script.js'))
    	.pipe(gulp.dest('dest/concat'));
});

gulp.task('concat-css', ['css'], function(){
	return gulp.src('dest/css/**/*.css')
    	.pipe(concat('style.css'))
    	.pipe(gulp.dest('dest/concat'));
});

gulp.task('uglify-js', ['concat-js'], function(cb){
	pump([
			gulp.src('dest/concat/*.js'),
			uglify(),
			gulp.dest('release/assets')
		],
		cb
	);
});

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', ['build']);
	gulp.watch('src/ts/**/*.ts', ['build']);
	gulp.watch('src/html/*.html', ['build']);
});

gulp.task('build', ['css', 'js'], function(){
	var jas = gulp.src('dest/js/**/*.js')
    	.pipe(gulp.dest('development/assets/js'));

	var styles = gulp.src('dest/css/**/*.css')
    	.pipe(gulp.dest('development/assets/css'));

	var html = gulp.src('src/html/*.html')
    	.pipe(gulp.dest('development'));

	return merge(jas, styles, html);
});

gulp.task('release', ['concat-css', 'uglify-js'], function(){
	return gulp.src('dest/concat/*.css')
    	.pipe(gulp.dest('release/assets'));
})