module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        plato: {
            static_analysis: {
              files: {
                'metrics': ['src/**/*.js', 'test/**/*.js']
              }
            }
        },
        jshint: {
            options: {
              curly: true,
              eqeqeq: true,
              eqnull: true,
              unused: true,
              browser: true
            },
            uses_defaults: ['src/**/*.js', 'test/**/*.js'],
        },
        jsdoc: {
            dist : {
                src: ['src/**/*.js'],
                dest: 'docs'
            }
        },
        watch: {
            configFiles: {
              options: {
                livereload: true
              },
              files: ['index.html', 'src/**/*.*', "resources/**/*.*", "test/**/*.*"],
              tasks: ['jssemicoloned','jshint', 'mocha', 'plato']
            }
        },
        jssemicoloned: {
            files: ['./src/**/*.js', './test/**/*.js']
        },
        mocha: {
          test: {
            src: ['test/**/*.html'],
          },
        }
    });

    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jssemicoloned');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['jssemicoloned', 'watch', 'jshint', 'mocha', 'plato']);
    grunt.registerTask('docs', ['jssemicoloned','jsdoc']);
    grunt.registerTask('analysis', ['jssemicoloned','jshint', 'plato']);
    grunt.registerTask('tests', ['jssemicoloned', 'jshint', 'mocha']);

};
