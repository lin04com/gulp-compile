'use strict';

var config = require('./config.json');
//console.log("config === > ", config);

var gulp = require('gulp'),
    //minifyHtml = require('gulp-minify-html'),
    //sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    //notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    copy = require(('gulp-copy')),
    zip = require('gulp-zip'),
    unzip = require('gulp-unzip'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync')
    //,livereload = require('gulp-livereload')
;


/* ===================================================== */

// HTML处理
gulp.task('html', function() {
    return gulp.src(config.html.src)
      .pipe(replace(/scripts\/script/g, 'scripts/main.min'))
      /*.pipe(minifyHtml({
        // conditionals : true,
        // spare : true
      })) //压缩*/
      .pipe(gulp.dest(config.html.dest))
      //.pipe(notify({ message: 'Html task complete' }))
    ;
});

// 样式
gulp.task('styles', function() {
  return gulp.src(config.style.src)
    //.pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(config.style.dest))
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.style.dest))
    //.pipe(notify({ message: 'Styles task complete' }))
    ;
});

// 脚本
gulp.task('scripts', function() {
  return gulp.src(config.script.concat)
    .pipe(jshint('.jshintrc'))
    .pipe(gulp.dest(config.script.dest))
    .pipe(uglify())
    .pipe(concat(config.script.main))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.script.dest))
    .pipe(jshint.reporter('default'))
    //.pipe(notify({ message: 'Scripts task complete' }))
  ;
});

// 图片
gulp.task('images', function() {
  return gulp.src(config.image.src)
    // .pipe(cache(imagemin({
    //     optimizationLevel: 5,
    //     progressive: true,
    //     interlaced: true,
    //     use : [pngquant]
    // })))
    .pipe(gulp.dest(config.image.dest))
    //.pipe(notify({ message: 'Images task complete' }))
  ;
});

gulp.task('clean', function() {
  return gulp.src(config.clean, {read: false})
    .pipe(clean());
});

gulp.task('copy', function(){
  return gulp.src('./dist/**/*')
  .pipe(copy('./deploy/', {
    prefix : 1
  }));
});

gulp.task('zip', function(){
  return gulp.src('dist/**/*')
    .pipe(zip('arache.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('unzip', function(){
  return gulp.src('arache.zip')
    .pipe(unzip())
    .pipe(gulp.dest('./deploy'));
});

gulp.task('browser-sync', function () {
   var files = [
      'dist/**/*',
   ];

   browserSync.init(files, {
      server: {
         baseDir: './dist/'
      }
   });
});


gulp.task('default', ['clean'], function() {
    gulp.start('html', 'styles', 'scripts', 'images');
});


gulp.task('watch', function() {

  gulp.start('browser-sync');

  gulp.watch('src/**/*.html', ['html']);

  gulp.watch('src/**/*.css', ['styles']);

  gulp.watch('src/**/*.js', ['scripts']);

  gulp.watch('src/images/**/*', ['images']);

  gulp.watch(['src/**']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    //server.changed(file.config);
  });

});

gulp.task('deploy', function(){
  gulp.start('copy');
});
