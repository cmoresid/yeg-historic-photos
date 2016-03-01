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
    exec: {
      webpack: './node_modules/webpack/bin/webpack.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-exec');

  // Default task(s).
  grunt.registerTask('default', ['bower', 'exec:webpack']);
};
