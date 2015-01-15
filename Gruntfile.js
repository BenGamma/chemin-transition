module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.

    grunt.initConfig({
        watch: {
            test: {
                files: ['test/*.js'],
                tasks: ['mochaTest'],
                options: {
                    spawn: false,
                },
            },

            ngmin: {
                files: [
                    'app/src/js/controllers/*.js', 
                    'app/src/js/app.js',
                    'app/src/js/services/*.js',
                    'app/src/js/directives/*.js'
                ],
                tasks: ['ngmin', 'concatJs', 'uglifyJs'],
                options: {
                    spawn: false,
                },
            },

            image: {
                files: [
                    'app/src/images/*.jpg',
                    'app/src/images/*.png',
                    'app/src/images/*.gif'
                ],
                tasks: ['imagemin'],
            },

            css: {
                files: ['app/src/scss/*.scss'],
                tasks: ['concatCss', 'uglifyCss'],
                options: {
                    spawn: false,
                },
            },

            options: {
                livereload: true,
            },
        },
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/*.js']
            }
        },
        ngmin: {
            app: {
                src: ['app/src/js/app.js'],
                dest: 'app/src/generated/js/app.js'
            },
            controllers: {
                src: ['app/src/js/controllers/*.js'],
                dest: 'app/src/generated/js/controllers.js'
            },
            directives: {
                src: ['app/src/js/directives/*.js'],
                dest: 'app/src/generated/js/directives.js'
            },
            services: {
                src: ['app/src/js/services/*.js'],
                dest: 'app/src/generated/js/services.js'     
            }
        },
        concatJs: {
            dist: {
                src: [
                    'app/src/generated/js/*.js'
                ],
                dest: 'public/javascripts/main.js'// la destination finale
            }
        },

        uglifyJs: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/src/generated/js/*.js'],
                dest: 'public/javascripts/main.js'
            }
        },

        concatCss: {
            dist: {
                src: [
                    'app/src/scss/*.scss'
                ],
                dest: 'public/stylesheets/main.css'// la destination finale
            }
        },

        uglifyCss: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/src/scss/*.scss'],
                dest: 'public/stylesheets/main.css'
            }
        },

        bower: {
            dev: {
                dest: 'public/',
                js_dest: 'public/lib/js',
                css_dest: 'public/lib/css',
                fonts_dest: 'public/lib/fonts/', //covers font types ['svg','eot', 'ttf', 'woff', 'otf']
                options: {
                    expand: true
                }
            }
        },

        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                },
                dynamic: {                         // Another target
                    files: [{
                        expand: true,                  // Enable dynamic expansion
                        cwd: 'app/src/',                   // Src matches are relative to this path
                        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                        dest: 'public/images/'                  // Destination path prefix
                    }]
                }
            },
        },

        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'app/src/scss/',
                    cssDir:  'app/src/css/'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', 'bower', 'compass', 'imagemin', 'mochaTest', 'ngmin', 'concatJs', 'uglifyJs', 'concatCss', 'concatJs');
    grunt.registerTask('vendor', ['bower']);
};