'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    config: {
      gruntfile: 'Gruntfile.js',
      lib: 'lib',
      test: 'test'
    },


    watch: {
      gruntfile: {
        files: '<%= config.gruntfile %>',
        tasks: [
        'jshint:gruntfile'
        ]
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: [
        'jshint:lib',
        'mochacli'
        ]
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: [
        'jshint:test',
        'mochacli'
        ]
      }
    },


    nodeunit: {
      files: [
      '<%= config.test %>/**/*_test.js'
      ]
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: '<%= config.gruntfile %>'
      },
      lib: {
        src: [
        '<%= config.lib %>/**/*.js'
        ]
      },
      test: {
        src: [
        '<%= config.test %>/**/*.js'
        ]
      }
    },


    mochacli: {
      options: {
        reporter: 'nyan',
        bail: true
      },
      all: [
      '<%= config.test %>/*.js'
      ]
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'mochacli'
    ]);
};
