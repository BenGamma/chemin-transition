var gulp = require('gulp');
var angularMin = require('gulp-angular-injector');
var concatenation = require('gulp-concat');
var uglify = require('gulp-minify-inline');
var compass = require('gulp-simple-compass');
var bower = require('gulp-bower2');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');

//angular minification
gulp.task('angular', function(){
    return gulp.src([
            'app/src/js/app.js',
            'app/src/js/controllers/*.js',
            'app/src/js/directives/*.js',
            'app/src/js/services/*.js'
        ])
        .pipe(angularMin())
        .pipe(gulp.dest('app/src/generated/js'))
    ;
});

//concatenation file
gulp.task('concat', function(){
    return gulp.src(['app/src/generated/js/*.js'])
        .pipe(concatenation('main.js'))
        .pipe(gulp.dest('app/src/generated'))
    ;
});

//compress js
gulp.task('jsCompress', function() {
    return gulp.src('app/src/generated/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/'))
        .pipe(livereload())
    ;
});

//compress js
gulp.task('compass', function() {
    return gulp.src('app/src/scss/*.scss')
    .pipe(compass())
    .pipe(gulp.dest('app/src/generated/css'))
    ;
});


//concatenation file
gulp.task('concatCss', function(){
    return gulp.src(['app/src/generated/css/*.css'])
        .pipe(concatenation('main.css'))
        .pipe(gulp.dest('app/src/generated/'))
    ;
});

//compress js
gulp.task('cssCompress', function() {
    return gulp.src('app/src/generated/main.css')
        .pipe(uglify())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload())
    ;
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'))
});

gulp.task('image', function () {
    return gulp.src('app/src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images'));
});

gulp.task('test', function () {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', [
    'angular', 
    'concat', 
    'jsCompress', 
    'compass', 
    'concatCss',
    'cssCompress',
    'bower',
    'image'
    ], function() {

    })
;


gulp.task('watch', function(){
    livereload.listen();
    gulp.watch([
            'app/src/js/app.js',
            'app/src/js/controllers/*.js',
            'app/src/js/directives/*.js',
            'app/src/js/services/*.js'
        ], ['angular', 'concat', 'jsCompress'])

    gulp.watch('app/src/scss/*.scss', ['compass', 'concatCss', 'cssCompress']);

    gulp.watch('app/src/images/*.png', ['image']);
    gulp.watch('app/src/images/*.jpg', ['image']);
    gulp.watch('app/src/images/*.gif', ['image']);
});
