var yeoman = require('yeoman-generator');
var fse = require("fs-extra");
var exec = require('child_process').exec;

var projectFolder;

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
            if(!fse.existsSync(answers.name)){
                fse.mkdirSync(answers.name);
            } else {
                this.log("this folder already exists please chose another name");
                return
            }
            done();
        }.bind(this));
    },
    
    createFoldersStructure: function(){
        this.mkdir(projectFolder + "/src");
        this.mkdir(projectFolder + "/libs");
        this.mkdir(projectFolder + "/resources");
        this.mkdir(projectFolder + "/dest");
        this.mkdir(projectFolder + "/metrics");
        this.mkdir(projectFolder + "/test");
    },
    
    copyTemplates: function(){
        this.copy('Gruntfile.js', projectFolder + '/Gruntfile.js');
        this.copy('package.json', projectFolder + '/package.json');
    },
    
    downloadDependencies: function(){
//        this.spawnCommand('cd', [projectFolder]);
    }
    
});