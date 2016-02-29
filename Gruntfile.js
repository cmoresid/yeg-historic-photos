module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    bower: {
      dev: {
        base: 'bower_components',
        /* the path to the bower_components directory */
        dest: 'client/vendor/bower_components',
        options: {
          checkExistence: true,
          debugging: true,
          paths: {
            bowerDirectory: 'bower_components',
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
          }
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'client/vendor/bower.js',
        cssDest: 'client/css/bower.css',
        mainFiles: {
          'ng-admin': ['build/ng-admin-only.min.js'],
          'bootstrap': ['dist/js/bootstrap.js', 'dist/css/bootstrap.css']
        }
      }
    },
    uglify: {
      bower: {
        options: {
          compress: true
        },
        files: {
          'client/vendor/bower.min.js': 'client/vendor/bower.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-bower-concat');

  // Default task(s).
  grunt.registerTask('default', ['bower_concat', 'bower']);
  grunt.registerTask('uglify', ['uglify']);
};
