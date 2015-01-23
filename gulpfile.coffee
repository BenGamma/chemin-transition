gulp         = require('gulp')
pngquant     = require('imagemin-pngquant');
$            = require('gulp-load-plugins')()
tasks        = ['coffee', 'concat', 'jsCompress', 'bower', 'image']
angularFile  = ['app/src/js/angular/coffee/app.coffee','app/src/js/angular/coffee/controllers/*.coffee','app/src/js/angular/coffee/directives/*.coffee','app/src/js/angular/coffee/services/*.coffee']


gulp.task 'coffee', ->
  gulp.src angularFile 
    .pipe $.coffee bare: true 
        .on 'error', $.util.log
    .pipe gulp.dest 'app/src/js/angular/js'

#js concatenation
gulp.task 'concat', ['coffee'], ->
    gulp.src 'app/src/js/angular/js/*.js'
    .pipe $.concat 'main.js' 
    .pipe gulp.dest 'app'

#js compression
gulp.task 'jsCompress', ['concat'], ->
    gulp.src 'app/main.js'
    .pipe $.minifyInline()
    .pipe gulp.dest 'app'

#bower
gulp.task 'bower', ->
    $.bower2()
    .pipe gulp.dest 'app/src/lib'

#image compress
options =
    progressive: true,
    svgoPlugins: [removeViewBox: false],
    use: [pngquant()] 

gulp.task 'image', ->
    gulp.src 'app/src/images/*' 
    .pipe $.imagemin options 
    .pipe gulp.dest 'public/images'


gulp.task 'watch', ->
    $.livereload.listen()
    gulp.watch angularFile, ['coffee', 'concat', 'jsCompress']
    gulp.watch 'app/src/scss/*.scss', ['compass', 'concatCss', 'cssCompress']

    gulp.watch 'app/src/images/*.png', ['image']
    gulp.watch 'app/src/images/*.jpg', ['image']
    gulp.watch 'app/src/images/*.gif', ['image']



gulp.task 'default', tasks


