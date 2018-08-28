// browser-fetch-json
// Tasks

const babel =       require('gulp-babel');
const gulp =        require('gulp');
const header =      require('gulp-header');
const mergeStream = require('merge-stream');
const replace =     require('gulp-replace');
const rename =      require('gulp-rename');
const size =        require('gulp-size');

const pkg = require('./package.json');
const banner = [
   `//! ${pkg.name} v${pkg.version}\n`,
   `//! ${pkg.description}\n`,
   `//! ${pkg.license} License -- ${pkg.homepage}\n`
   ];

// Tasks
const task = {
   build: function() {
      function updateBanner() {
         return gulp.src('browser-fetch-json.js')
            .pipe(replace(/\/\/!.*\n/g, ''))
            .pipe(header(banner.join('')))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('.'));
         }
      function minify() {
         return gulp.src('browser-fetch-json.js')
            .pipe(rename({ extname: '.min.js' }))
            .pipe(babel({ presets: ['minify'] }))
            .pipe(header(banner[0] + banner[2]))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('.'));
         }
      return mergeStream(updateBanner(), minify());
      }
   };

gulp.task('build', task.build);