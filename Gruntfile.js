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
                tasks: ['ngmin', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
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
        concat: {
            dist: {
                src: [
                    'app/src/generated/js/*.js'
                ],
                dest: 'public/javascripts/main.js'// la destination finale
            }
        },

        uglify: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/src/generated/js/*.js'],
                dest: 'public/javascripts/main.js'
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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower');
    grunt.registerTask('default', 'mochaTest', 'ngmin', 'concat', 'uglify');
    grunt.registerTask('vendor', ['bower']);
};