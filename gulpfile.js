const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js', 'images'], function() {
  browserSync.init({
    server: 'dist'
  });

  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*.*', ['images']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'android 4', 'opera 12']
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

// JS
gulp.task('js', function() {
  return gulp
    .src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Optimize images
gulp.task('images', function() {
  gulp
    .src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['serve']);
