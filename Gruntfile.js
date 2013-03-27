module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.jquery.js',
        dest: '<%= pkg.name %>.jquery.min.js'
      }
    },
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['*.jquery.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
  });
  
  // Load the npm tasks
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
};