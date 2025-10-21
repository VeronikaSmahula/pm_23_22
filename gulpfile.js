const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// 🔹 Шляхи до файлів
const paths = {
  html: "src/html/**/*.html",
  styles: "src/scss/**/*.scss",
  scripts: "src/js/**/*.js",
  images: "src/images/**/*"
};

// 🔹 Копіювання HTML
gulp.task("html", function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest("dist")) // копіює index.html у dist/
    .pipe(browserSync.stream());
});

// 🔹 Компіляція SCSS → CSS
gulp.task("styles", function () {
  return gulp.src(paths.styles)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// 🔹 Копіювання JS
gulp.task("scripts", function () {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// 🔹 Копіювання зображень
gulp.task("images", function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.stream());
});

// 🔹 Копіювання Bootstrap CSS
gulp.task("bootstrap-css", function () {
  return gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
    .pipe(gulp.dest("dist/css"));
});

// 🔹 Копіювання Bootstrap JS
gulp.task("bootstrap-js", function () {
  return gulp.src("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js")
    .pipe(gulp.dest("dist/js"));
});

// 🔹 Сервер + автоматичне оновлення
gulp.task("serve", function () {
  browserSync.init({
    server: { baseDir: "dist" },
    notify: false,
    open: true
  });

  gulp.watch(paths.html, gulp.series("html"));
  gulp.watch(paths.styles, gulp.series("styles"));
  gulp.watch(paths.scripts, gulp.series("scripts"));
  gulp.watch(paths.images, gulp.series("images"));
});

// 🔹 Завдання за замовчуванням
gulp.task("default", gulp.series(
  gulp.parallel("html", "styles", "scripts", "images", "bootstrap-css", "bootstrap-js"),
  "serve"
));

