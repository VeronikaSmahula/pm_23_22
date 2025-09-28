const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Шлях до файлів
const paths = {
  html: "src/html/**/*.html",
  styles: "src/scss/**/*.scss",
  scripts: "src/js/**/*.js",
  images: "src/images/**/*"
};

// HTML
gulp.task("html", function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// SCSS → CSS
gulp.task("styles", function () {
  return gulp.src(paths.styles)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// JS
gulp.task("scripts", function () {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Images
gulp.task("images", function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.stream());
});

// BrowserSync + Watcher
gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch(paths.html, gulp.series("html"));
  gulp.watch(paths.styles, gulp.series("styles"));
  gulp.watch(paths.scripts, gulp.series("scripts"));
  gulp.watch(paths.images, gulp.series("images"));
});

// Default
gulp.task("default", gulp.series(
  gulp.parallel("html", "styles", "scripts", "images"),
  "serve"
));