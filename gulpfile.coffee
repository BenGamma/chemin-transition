require 'coffee-script/register'

gulp           = require('gulp')
pngquant       = require('imagemin-pngquant');
mainBowerFiles = require('main-bower-files');
$              = require('gulp-load-plugins')()
angularPath    = 'app/src/coffee/angular'
tasks          = ['coffee', 'concat', 'js-compress', 'bower', 'image']
angularFile    = ['app/src/coffee/angular/app.coffee','app/src/coffee/angular/ontrollers/*.coffee','app/src/coffee/angular/directives/*.coffee','app/src/coffee/angular/services/*.coffee']
browsers       = ["ie >= 9", "ie_mob >= 10", "ff >= 30", "chrome >= 34", "safari >= 7", "opera >= 23", "ios >= 7", "android >= 4.4", "bb >= 10"]

watch = ->
    gulp.watch angularFile, ['coffee', 'concat', 'ngAnnotate', 'js-compress', 'index-dev']
    gulp.watch 'app/src/scss/*.scss', ['compass', 'css-concat', 'css-compress', 'index-dev']

    gulp.watch 'app/src/images/*.png', ['image']
    gulp.watch 'app/src/images/*.jpg', ['image']
    gulp.watch 'app/src/images/*.gif', ['image']

    gulp.watch 'bower.json', ['bower', 'index-dev']

gulp.task 'coffee', ->
  gulp.src angularFile 
    .pipe $.coffee bare: true 
        .on 'error', $.util.log
    .pipe gulp.dest 'app/src/.compile/js'


#js concatenation
gulp.task 'concat', ['coffee'], ->
    gulp.src 'app/src/.compile/js/*.js'
    .pipe $.concat 'main.js' 
    .pipe gulp.dest 'app'

gulp.task 'ngAnnotate', ['concat'], ->
    gulp.src 'app/main.js'
    .pipe $.ngAnnotate() 
    .pipe gulp.dest 'app'

#js compression
gulp.task 'js-compress', ['ngAnnotate'], ->
    gulp.src 'app/main.js'
    .pipe $.uglify()
    .pipe gulp.dest 'app'
    .pipe $.connect.reload()

#compass
gulp.task 'compass', ->
    gulp.src 'app/src/scss/*.scss'
        .pipe $.sass
            onError: console.error.bind(console, 'SASS error:')
        .pipe $.autoprefixer
            browsers: browsers 
        .pipe gulp.dest 'app/src/.compile/css'
        .pipe $.size()

#css concat
gulp.task 'css-concat', ['compass'], ->
    gulp.src 'app/src/.compile/css/*.css'
    .pipe $.concat 'main.css' 
    .pipe gulp.dest 'app'

#css compression
gulp.task 'css-compress', ['css-concat'], ->
    gulp.src 'app/main.css'
    .pipe $.minifyCss keepBreaks:true
    .pipe gulp.dest 'app'
    .pipe $.connect.reload()


#bower
gulp.task 'bower', ->
    gulp.src mainBowerFiles
                paths:
                    bowerDirectory: 'bower_components',
                    bowerJson: 'bower.json'
    .pipe gulp.dest 'app/src/lib'

#image compress
options =
    progressive: true,
    svgoPlugins: [removeViewBox: false],
    use: [pngquant()] 

gulp.task 'image', ->
    gulp.src 'app/src/images/*' 
    .pipe $.imagemin options 
    .pipe gulp.dest 'app/images'

gulp.task 'connect', ->
    $.connect.server
        root: 'app'
        livereload: true

gulp.task 'connect-dev', ->
    $.connect.server
        root: 'app/src'
        livereload: true

gulp.task 'html-dev', ->
    gulp.src 'app/src/*.html'
    .pipe $.connect.reload()

gulp.task 'html', ->
    gulp.src 'app/*.html'
    .pipe $.connect.reload()

gulp.task 'index-dev', ['coffee'], ->
    gulp.src('app/src/index.html')
    .pipe($.inject(gulp.src(['app/src/.compile/js/*.js','app/src/.compile/css/*.css' ], {read: false}), {relative: true}))
    .pipe gulp.dest 'app/src'
    .pipe $.connect.reload()

gulp.task 'watch', ['connect'], ->
    gulp.watch 'app/*.html', ['html']
    watch()

gulp.task 'watch-dev', ['connect-dev'], ->
    gulp.watch 'app/src/*.html', ['html-dev']
    watch()



gulp.task 'default', tasks


