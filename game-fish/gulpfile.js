/**
 *  @ Author: 智能社-strive
 *  @ Date: 2016/4/19.
 */
var gulp=require('gulp'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify');

gulp.task('concat:uglify',function(){
    gulp.src('lib/*.js')
        .pipe(concat('entry.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('default',['concat:uglify']);

