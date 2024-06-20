const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Compile SCSS to CSS
function styles() {
  return gulp.src('src/scss/*.scss')  // scss path in
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));  // css path out
}

// Watch for changes and recompile SCSS
function watch() {
  gulp.watch('src/scss/*.scss', styles);  // scss path in
}

// Define default task that runs the styles and watch tasks
exports.init = styles;
exports.watch = watch;
