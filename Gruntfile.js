"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        globalstrict: true,
        node: true
      },
      lib: {
        files: {
          src: ['Gruntfile.js', 'package.json', 'lib/*.js', 'bin/*.js']
        }
      },
      test: {
        options: {
          globals: {
            describe: true,
            it: true,
            before: true
          }
        },
        files: {
          src: ['test/*.js']
        }
      }
    }
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint']);
};
