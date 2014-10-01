'use strict';
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;

var projectFolder, library, testLibrary;

module.exports = yeoman.generators.Base.extend({

    askProjectName: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Set your project name',
            default : 'MyJsProject'
        }, function (answers) {
            projectFolder = answers.name;
            this.mkdir(projectFolder);
            this.destinationRoot(projectFolder);
            done();
        }.bind(this));
    },

    askTestingLibrary: function () {
        var done = this.async();
        this.prompt({
            type    : 'list',
            choices : ["mocha", "jasmine"],
            name    : 'library',
            message : 'Choose your test library',
            default : 'mocha'
        }, function (answers) {
            testLibrary = answers.library;
            if(testLibrary === "jasmine"){
                library = "grunt-contrib-jasmine";
            } else if (testLibrary === "mocha"){
                library = "grunt-mocha";
            }
            done();
        }.bind(this));
    },

    createFoldersStructure: function(){
        this.mkdir("libs");
        this.mkdir("resources");
        this.mkdir("dist");
        this.mkdir("docs");
        this.mkdir("src");
        this.mkdir("metrics");
        this.mkdir("test");
    },

    downloadDependencies: function(){
         var done = this.async();
         this.npmInstall([library, 'grunt', 'grunt-cli', 'grunt-plato', 'grunt-karma', 'grunt-istanbul', 'grunt-jsdoc', 'grunt-contrib-watch', 'grunt-contrib-jshint'], { 'saveDev': true }, done);
    },

    copyTemplates: function(){
       this.copy('Gruntfile'+ testLibrary +'.js', 'Gruntfile.js');
       this.copy('package'+ testLibrary +'.json', 'package.json');
       this.copy('index.html', 'index.html');
    }
});
