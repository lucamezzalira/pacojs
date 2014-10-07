'use strict';
var yeoman = require('yeoman-generator');

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
            choices : ["mocha", "jasmine", "none"],
            name    : 'library',
            message : 'Choose your test library',
            default : 'mocha'
        }, function (answers) {
            testLibrary = answers.library;
            if(testLibrary === "jasmine"){
                library = "grunt-contrib-jasmine";
            } else if (testLibrary === "mocha"){
                library = "grunt-mocha";
            } else {
                library = "";
                this.log("Paco.js is not adding any test framework to your new project! :P");
                this.log("==========================================================================");
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
        this.log("Paco.js is going to download all the dependencies, so please be patient... :P");
        this.log("==========================================================================");
        var dependencies = ['grunt', 'grunt-cli', 'grunt-plato', 'mocha', 'jasmine', 'grunt-jssemicoloned', 'git+https://github.com/jsdoc3/jsdoc.git', 'grunt-jsdoc', 'grunt-contrib-watch', 'grunt-contrib-jshint'];
        if (library !== ""){
            dependencies.push(library);
        }
        var done = this.async();
        this.npmInstall(dependencies, { 'saveDev': true }, done);
    },

    copyTemplates: function(){
        if(library !== ""){
           this.copy('Gruntfile'+ testLibrary +'.js', 'Gruntfile.js');
           this.copy('package'+ testLibrary +'.json', 'package.json');
        } else {
           this.copy('Gruntfile.js', 'Gruntfile.js');
           this.copy('package.json', 'package.json');
        }

        this.copy('index.html', 'index.html');
    }
});
