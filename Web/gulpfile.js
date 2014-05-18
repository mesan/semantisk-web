var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require("gulp-inject");
var less = require('gulp-less');
var path = require('path');
var clean = require('gulp-clean');
var w3cjs = require('gulp-w3cjs');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var manifest = require('gulp-manifest');
var bowerFiles = require('gulp-bower-files');
var ngmin = require('gulp-ngmin');

gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('clean', function() {
  return gulp.src(['build', 'release'], {read: false})
  .pipe(clean());
});

gulp.task('build-less', function () {
  return gulp.src('src/less/**/*.less')
  .pipe(changed('build/css'))
  .pipe(less({
    paths: [path.join(__dirname, 'less', 'includes')]
  }).on('error', gutil.log))
  .pipe(gulp.dest('build/css'));

});

gulp.task('build-js', ['lint'], function () {
  return gulp.src('src/js/**/*.js')
  .pipe(changed('build/js'))
  .pipe(gulp.dest('build/js'));
});

gulp.task('build-assets', function () {
  return gulp.src('assets/*.*')
  .pipe(changed('build/assets'))
  .pipe(gulp.dest('build/assets'));
});

gulp.task('build-bower', function() {
  return bowerFiles()
  .pipe(gulp.dest('build/lib'));
});

gulp.task('build', ['build-less', 'build-js', 'build-assets', 'build-bower'], function () {
  return gulp.src('src/index.html')
  .pipe(w3cjs())
  .pipe(inject(gulp.src(['build/lib/**/*.js', 'build/js/**/*.js', 'build/**/*.css']), {
    read: false,
    ignorePath: '/build/',
    addRootSlash: false
  }))
  .pipe(gulp.dest("build"));
});

gulp.task('compile-css', ['build-less'], function () {
  return gulp.src('build/**/*.css')
  .pipe(concat('app.css'))
  .pipe(gulp.dest("release"));
});

gulp.task('compile-js', ['build-js'], function () {
  return gulp.src(['build/lib/**/*.js', 'build/js/**/*.js'])
  .pipe(concat('app.js'))
  .pipe(ngmin())
  .pipe(uglify())
  .pipe(gulp.dest('release'));
});

gulp.task('compile-assets', ['build-assets'], function () {
  return gulp.src('build/assets/*')
  .pipe(gulp.dest("release/assets"));
});

gulp.task('compile', ['compile-css', 'compile-js', 'compile-assets', 'build'], function () {
  return gulp.src('src/index.html')
  .pipe(inject(gulp.src(["release/*.js", "release/*.css"]), {
    read: false,
    ignorePath: '/release/',
    addRootSlash: false
  }))
  .pipe(gulp.dest("release"));
});

gulp.task('default', ['compile']);

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*', ['build']);

  var livereloadServer = livereload();
  gulp.watch('build/**/*').on('change', function(file) {
    livereloadServer.changed(file.path);
  });
});
