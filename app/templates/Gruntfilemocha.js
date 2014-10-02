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
            livereload: {
              options: {
                livereload: 35729 
              },
              files: ['index.html', 'dist/**/*.*'],
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch', 'jshint', 'plato']);
    grunt.registerTask('docs', ['jsdoc']);
    grunt.registerTask('analysis', ['jshint', 'plato']);

};
