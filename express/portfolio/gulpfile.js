var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
 print = require('gulp-print');
gulp.task('sass', function () {
  gulp.src('stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(livereload());
});

gulp.task('js', function () {
  return gulp.src([
			'./app/javascripts/jquery.min.js',
			'./app/javascripts/bootstrap.js',
      './javascripts/projects.js',

		])
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./public/js/'))
		.pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('stylesheets/*.scss', ['sass']);
  gulp.watch('./app/javascripts/**/*.js', ['js']);
});

gulp.task('develop', function () {
  livereload.listen(35723);
  nodemon({
    script: './bin/www',
    ext: 'js coffee handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'sass',
  'js',
  'develop',
  'watch'
]);

gulp.task('heroku:production', [
  'sass',
  'js'
]);
