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
        uglify: {
            options: {
                mangle: true,
                beautify: true,
                drop_console: true,
                compress: true,
                sourceMap: true,
                report: 'min',
                banner: '/*\n' +
                    ' * <%= pkg.name %>\n' +
                    ' * v<%= pkg.version %>\n' +
                    ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' **/\n'
            },
            my_target: {
                files: {
                    'dist/gs-core.min.js': ['dist/gs-core.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'plato']);

};
