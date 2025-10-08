const gulp = require('gulp');

// Копіювання Bootstrap CSS
gulp.task('bootstrap-css', function() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/css'));
});

// Копіювання Bootstrap JS
gulp.task('bootstrap-js', function() {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(gulp.dest('dist/js'));
});

// Завдання за замовчуванням
gulp.task('default', gulp.series('bootstrap-css', 'bootstrap-js'));
