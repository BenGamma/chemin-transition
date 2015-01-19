gulp         = require('gulp')
pngquant     = require('imagemin-pngquant');
$            = require('gulp-load-plugins')()
tasks        = ['angular', 'concat', 'jsCompress', 'compass', 'cssConcat', 'cssCompress', 'bower', 'image', 'test']
angularFile  = ['app/src/js/app.js','app/src/js/controllers/*.js','app/src/js/directives/*.js','app/src/js/services/*.js']

#angular minification
gulp.task 'angular', ->
    gulp.src angularFile
    .pipe $.angularInjector()
    .pipe gulp.dest 'app/src/generated/js'

#js concatenation
gulp.task 'concat', ->
    gulp.src 'app/src/generated/js/*.js'
    .pipe $.concat 'main.js' 
    .pipe gulp.dest 'app/src/generated'

#js compression
gulp.task 'jsCompress', ->
    gulp.src 'app/src/generated/main.js'
    .pipe $.minifyInline()
    .pipe gulp.dest 'public/javascripts/'
    .pipe $.livereload()

#scss compilation
gulp.task 'compass', ->
    gulp.src 'app/src/scss/*.scss'
    .pipe $.simpleCompass()
    .pipe gulp.dest 'app/src/generated/css'

#concatenation css file
gulp.task 'cssConcat', ->
    gulp.src 'app/src/generated/css/*.css'
    .pipe $.concat 'main.css'
    .pipe gulp.dest 'app/src/generated/'

#css compress
gulp.task 'cssCompress', ->
    gulp.src 'app/src/generated/main.css'
    .pipe $.minifyInline()
    .pipe gulp.dest 'public/stylesheets'
    .pipe $.livereload()

#bower
gulp.task 'bower', ->
    $.bower2()
    .pipe gulp.dest 'public/lib/'

#image compress
options =
    progressive: true,
    svgoPlugins: [removeViewBox: false],
    use: [pngquant()] 

gulp.task 'image', ->
    gulp.src 'app/src/images/*' 
    .pipe $.imagemin options 
    .pipe gulp.dest 'public/images'

#test js
gulp.task 'test', ->
    gulp.src 'test/*.js', read: false
    .pipe $.mocha reporter: 'nyan'


gulp.task 'watch', ->
    $.livereload.listen()
    gulp.watch angularFile, ['angular', 'concat', 'jsCompress'] 
    gulp.watch 'app/src/scss/*.scss', ['compass', 'concatCss', 'cssCompress']

    gulp.watch 'app/src/images/*.png', ['image']
    gulp.watch 'app/src/images/*.jpg', ['image']
    gulp.watch 'app/src/images/*.gif', ['image']



gulp.task 'default', tasks


