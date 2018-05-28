const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const watch = require("gulp-watch");

const chemins = {
  sources: "./src/",
  distrib: "./distrib/",
  demo: "./docs/node_modules/htmlelement-shortcut/distrib/"
};



gulp.task("htmlelement-shortcut.min.js", () => {
  return gulp.src([
      "node_modules/htmlelement-events-extension/distrib/htmlelement-events.min.js",
      "src/**.js"
    ])
    .pipe(concat("htmlelement-shortcut.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true
    }))
    .pipe(debug())
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(debug())
    .pipe(gulp.dest(chemins.distrib))
});


gulp.task("release", () => {
  return gulp.src([
      "node_modules/htmlelement-events-extension/distrib/htmlelement-events.min.js",
      "src/**.js"
    ])
    .pipe(concat("htmlelement-shortcut.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true,
      comments: false,
      minified: true
    }))
    .pipe(debug())
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("demo", () => {
  return gulp.src([
      "node_modules/htmlelement-events-extension/distrib/htmlelement-events.min.js",
      "src/**.js"
    ])
    .pipe(concat("htmlelement-shortcut.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: false,
      comments: false,
      minified: false
    }))
    .pipe(debug())
    .pipe(gulp.dest(chemins.demo))
});

gulp.task("watch:htmlelement-shortcut.min.js", function() {
  watch("./src/**.js", function() {
    gulp.run("htmlelement-shortcut.min.js");
  });
});

gulp.task("default", ["htmlelement-shortcut.min.js"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:htmlelement-shortcut.min.js"]);