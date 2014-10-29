'use strict';

module.exports = function (grunt) {

    //var watchFiles = {
    //    serverViews: ['app/views/**/*.*'],
    //    serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
    //    clientViews: ['public/modules/**/views/**/*.html'],
    //    clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
    //    clientCSS: ['public/modules/**/*.css'],
    //    mochaTests: ['app/tests/**/*.js']
    //};

    grunt.initConfig({

        watch: {
            scssFiles: {
                files: ['public/stylesheets/**/*.scss'],
                tasks: ['sass']
            }
        },

        browserify: {
          options: {
            transform: [require('grunt-react').browserify]
          },
          components: {
            options: {
              alias: [
                'react:',
                'Signup:'
              ]
            },
            dest: 'public/components.js',
            src: ['app/views/**/*.jsx']
          }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.scss'],
                    dest: 'public/stylesheets',
                    ext: '.css'
                }]
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: ['index.html', 'server.js', 'routes/**/*.js', 'models/**/*.js']
                }
            }
        },

        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }


    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['concurrent:default']);


}
