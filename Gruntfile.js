/*
 * grunt-contrib-haml
 *
 * Copyright (c) 2012 Concordus Applications
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    haml: {
      'coffee_js': {
        options: { target: 'js', language: 'coffee', placement: 'global' },
        files: {
          'tmp/coffee_js/haml.js': 'test/fixtures/coffee/coffee1.haml',
          'tmp/coffee_js/concat.js': [
            'test/fixtures/coffee/coffee1.haml',
            'test/fixtures/coffee/coffee2.haml'
          ]
        }
      },
      'coffee_js_amd': {
        options: {
          target: 'js',
          language: 'coffee',
          dependencies: {
            '$': 'jquery',
            '_': 'underscore'
          }
        },
        files: {
          'tmp/coffee_js_amd/haml.js': 'test/fixtures/coffee/coffee3.haml',
          'tmp/coffee_js_amd/concat.js': [
            'test/fixtures/coffee/coffee1.haml',
            'test/fixtures/coffee/coffee2.haml'
          ]
        }
      },
      'coffee_html': {
        options: {
          language: 'coffee',
          context: {
            'greet': 'Morgan Freeman',
            'class': 'still alive'
          }
        },
        files: {
          'tmp/coffee_html/haml.html': 'test/fixtures/coffee/coffee1.haml',
          'tmp/coffee_html/concat.html': [
            'test/fixtures/coffee/coffee1.haml',
            'test/fixtures/coffee/coffee2.haml'
          ]
        }
      },
      'js_js': {
        options: { target: 'js', placement: 'global' },
        files: {
          'tmp/js_js/haml.js': 'test/fixtures/js/js1.haml',
          'tmp/js_js/concat.js': [
            'test/fixtures/js/js1.haml',
            'test/fixtures/js/js2.haml'
          ]
        }
      },
      'js_js_amd': {
        options: {
          target: 'js',
          placement: 'amd',
          dependencies: {
            '$': 'jquery',
            '_': 'underscore'
          }
        },
        files: {
          'tmp/js_js_amd/haml.js': 'test/fixtures/js/js3.haml',
          'tmp/js_js_amd/concat.js': [
            'test/fixtures/js/js1.haml',
            'test/fixtures/js/js2.haml'
          ]
        }
      },
      'js_html': {
        options: {
          context: {
            length: 321,
            height: 41
          }
        },
        files: {
          'tmp/js_html/haml.html': 'test/fixtures/js/js1.haml',
          'tmp/js_html/concat.html': [
            'test/fixtures/js/js1.haml',
            'test/fixtures/js/js2.haml'
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'haml', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
