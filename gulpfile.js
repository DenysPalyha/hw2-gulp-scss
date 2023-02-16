import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import concat from "gulp-concat";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import terser from "gulp-terser";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import clean from "gulp-clean";
import browserSync from "browser-sync";

const BS = browserSync.create();
const sass = gulpSass(dartSass);

const minify = () =>
  gulp
    .src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));

const buildStyles = () =>
  gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat("styles.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"));

const js = () =>
  gulp
    .src("./src/**/*.js")
    .pipe(concat("scripts.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./dist/script"));

const images = () =>
  gulp
    .src("./src/images/**/*")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("./dist/images/"));

const cleanDist = () => gulp.src("./dist/*", { read: false }).pipe(clean());

export const build = gulp.series(
  cleanDist,
  gulp.parallel(minify, buildStyles, images, js)
);

const gulpWatch = () => {
  BS.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch(
    "./src/**/*.html",
    gulp.series(minify, (done) => {
      BS.reload();
      done();
    })
  );
  gulp.watch(
    "./src/**/*.scss",
    gulp.series(buildStyles, (done) => {
      BS.reload();
      done();
    })
  );

  gulp.watch(
    "./src/**/*.js",
    gulp.series(js, (done) => {
      BS.reload();
      done();
    })
  );

  gulp.watch(
    "./src/images/**/*",
    gulp.series(images, (done) => {
      done();
    })
  );
};

export const dev = gulp.series(
  cleanDist,
  gulp.parallel(minify, buildStyles, images, js),
  gulpWatch
);
