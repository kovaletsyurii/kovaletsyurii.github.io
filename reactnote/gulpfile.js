'use strict'
let gulp = require("gulp");
let sass = require("gulp-sass");
let babel = require("gulp-babel");

gulp.task("sass", function(){
	return gulp.src("main.sass")
		.pipe(sass())
		.pipe(gulp.dest("dist/css/"));
});

gulp.task('babel', () =>
    gulp.src('main.jsx')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js/'))
);

gulp.watch('*.sass', ['sass']);
gulp.watch('*.jsx', ['babel']);

gulp.task('default', [ 'sass']);