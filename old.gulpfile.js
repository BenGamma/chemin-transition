var $, angularFile, angularPath, browsers, gulp, options, pngquant, productions, tasks, watch;

require('coffee-script/register');

gulp = require('gulp');

pngquant = require('imagemin-pngquant');

$ = require('gulp-load-plugins')();

angularPath = 'app/src/coffee/angular';

tasks = ['coffee', 'concat', 'ngAnnotate', 'js-compress', 'compass', 'css-concat', 'css-compress', 'index-dev', 'bower'];

productions = ['coffee', 'concat', 'ngAnnotate', 'js-compress', 'compass', 'css-concat', 'css-compress', 'bower', 'partials'];

angularFile = ['app/src/coffee/angular/app.coffee', 'app/src/coffee/angular/controllers/*.coffee', 'app/src/coffee/angular/directives/*.coffee', 'app/src/coffee/angular/services/*.coffee'];

browsers = ["ie >= 9", "ie_mob >= 10", "ff >= 30", "chrome >= 34", "safari >= 7", "opera >= 23", "ios >= 7", "android >= 4.4", "bb >= 10"];

watch = function() {
  gulp.watch(angularFile, ['coffee', 'concat', 'ngAnnotate', 'js-compress', 'index-dev']);
  gulp.watch('app/src/scss/*.scss', ['compass', 'css-concat', 'css-compress', 'index-dev']);
  gulp.watch('app/src/images/*.png', ['image']);
  gulp.watch('app/src/images/*.jpg', ['image']);
  gulp.watch('app/src/images/*.gif', ['image']);
  gulp.watch('app/src/partials/**/*.html', ['index-dev']);
  return gulp.watch('bower.json', ['bower', 'index-dev']);
};

gulp.task('coffee', function() {
  return gulp.src(angularFile).pipe($.coffee({
    bare: true
  })).on('error', $.util.log).pipe(gulp.dest('app/src/.compile/js'));
});

gulp.task('js2coffee', function() {
  return gulp.src('config/routes/api/coffee/*.coffee').pipe($.coffee({
    bare: true
  })).on('error', $.util.log).pipe(gulp.dest('config/routes/api'));
});

gulp.task('concat', ['coffee'], function() {
  return gulp.src('app/src/.compile/js/*.js').pipe($.concat('main.js')).pipe(gulp.dest('public/javascripts'));
});

gulp.task('ngAnnotate', ['concat'], function() {
  return gulp.src('public/javascripts/main.js').pipe($.ngAnnotate()).pipe(gulp.dest('public/javascripts'));
});

gulp.task('js-compress', ['ngAnnotate'], function() {
  return gulp.src('public/javascripts/main.js').pipe($.uglify()).pipe(gulp.dest('public/javascripts')).pipe($.connect.reload());
});

gulp.task('compass', function() {
  gulp.src('bower_components/foundation/scss/*.scss').pipe($.sass({
    onError: console.error.bind(console, 'SASS error:')
  })).pipe(gulp.dest('bower_components/foundation/css'));
  return gulp.src('app/src/scss/*.scss').pipe($.sass({
    onError: console.error.bind(console, 'SASS error:')
  })).pipe($.autoprefixer({
    browsers: browsers
  })).pipe(gulp.dest('app/src/.compile/css')).pipe($.size());
});

gulp.task('css-concat', ['compass'], function() {
  return gulp.src('app/src/.compile/css/*.css').pipe($.concat('main.css')).pipe(gulp.dest('public/stylesheets'));
});

gulp.task('css-compress', ['css-concat'], function() {
  return gulp.src('public/stylesheets/main.css').pipe($.minifyCss({
    keepBreaks: true
  })).pipe(gulp.dest('public/stylesheets')).pipe($.connect.reload());
});

gulp.task('bower', function() {
  return $.bower({
    '/bower_components': '/bower_components'
  }).pipe(gulp.dest('public/lib')).pipe(gulp.dest('app/src/lib'));
});

options = {
  progressive: true,
  svgoPlugins: [
    {
      removeViewBox: false
    }
  ],
  use: [pngquant()]
};

gulp.task('partials', function() {
  return gulp.src('app/src/partials/*.html').pipe(gulp.dest('public/partials'));
});

gulp.task('image', function() {
  return gulp.src('app/src/images/*').pipe($.imagemin(options)).pipe(gulp.dest('app/images'));
});

gulp.task('connect', function() {
  return $.connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('connect-dev', function() {
  return $.connect.server({
    root: 'app/src',
    livereload: true
  });
});

gulp.task('html-dev', function() {
  return gulp.src('app/src/*.html').pipe($.connect.reload());
});

gulp.task('html', function() {
  return gulp.src('app/*.html').pipe($.connect.reload());
});

gulp.task('index-dev', ['coffee'], function() {
  return gulp.src('app/src/index.html').pipe($.inject(gulp.src(['app/src/.compile/js/*.js', 'app/src/.compile/css/*.css'], {
    read: false
  }), {
    relative: true
  })).pipe(gulp.dest('app/src')).pipe($.connect.reload());
});

gulp.task('watch', ['connect'], function() {
  gulp.watch('app/*.html', ['html']);
  return watch();
});

gulp.task('watch-dev', ['connect-dev'], function() {
  gulp.watch('app/src/*.html', ['html-dev']);
  return watch();
});

gulp.task('default', productions);
