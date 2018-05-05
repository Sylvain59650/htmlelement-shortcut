const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const watch = require("gulp-watch");

const chemins = {
  sources: "./src/",
  distrib: "./distrib/"
};



gulp.task("htmlElement-shortcut.min.js", () => {
  return gulp.src([
      "src/**.js",
      "node_modules/htmlelement-events-extension/distrib/htmlElement-events.min.js"
    ])
    .pipe(concat("htmlElement-shortcut.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true
    }))
    .pipe(debug())
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});


gulp.task("watch:htmlElement-shortcut.min.js", function() {
  watch("./src/**.js", function() {
    gulp.run("htmlElement-shortcut.min.js");
  });
});

gulp.task("default", ["htmlElement-shortcut.min.js"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:htmlElement-shortcut.min.js"]);