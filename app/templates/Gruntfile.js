/**
 * Created by luca.mezzalira on 25/07/2014.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
        },
        browserify: {
            dist: {
                files: {
                    'dist/gs-core.js': ['src/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'uglify']);

};