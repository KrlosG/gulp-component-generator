/**
 * gulp-component-generator
 *
 * A gulp task to automatically generate web components for your site/app
 */

'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var inquirer = require('inquirer');
var path = require('path');

/**
 * Defaults
 *
 */

var defaults = {
  relativeComponentLocation: './app/components/'
};

gulp.task('component', function (done) {

  var prompts = [
    {
      name: 'componentName',
      message: 'Enter the component name in pascal case (e.g. ComponentName)'
    },
    {
      name: 'relativeComponentLocation',
      message: 'Enter the relative URL path for your external components (default: "./app/components/")?'
    },
    {
      type: 'confirm',
      name: 'createJS',
      message: 'Create a JS file?'
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    }
  ];

  inquirer.prompt(prompts, function (answers) {

    if (!answers.moveon) {
      return done();
    } else if (!answers.componentName) {
      console.log('No component provided.');
      return done();
    }

    if (!answers.relativeComponentLocation) {
      answers.relativeComponentLocation = defaults.relativeComponentLocation;
    }

    if (answers.relativeComponentLocation.slice(-1) !== '/') {
      answers.relativeComponentLocation += '/';
    }

    // URL does not support backslashes. Replace them.
    answers.relativeComponentLocation = answers.relativeComponentLocation.replace('\\', '/');

    var sources = [__dirname + '/../templates/**'];

    // Don't add a JS file if not requested
    if (!answers.createJS) {
      sources.push('!' + __dirname + '/../templates/*.js');
    }

    gulp.src(sources)
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = answers.componentName + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest(path.join(process.cwd(), answers.relativeComponentLocation, '/' + answers.componentName)))
      .pipe(install())
      .on('end', function () {
        done();
      });
  });

});
