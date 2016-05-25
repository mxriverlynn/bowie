module.exports = function(grunt) {
  grunt.initConfig({

    jasmine_nodejs: {
      options: {
         specNameSuffix: ".specs.js", // also accepts an array
         helperNameSuffix: ".helpers.js",
         useHelpers: true,
         reporters: {
           console: {
             colors: true,
             cleanStack: 1,       // (0|false)|(1|true)|2|3
             verbosity: 3,        // (0|false)|1|2|(3|true)
             listStyle: "indent", // "flat"|"indent"
             activity: false
           }
         },
      },

      bowie: {
        helpers: ["specs/helpers/**"],
        specs: ["specs/**/*.specs.js"]
      }
    },

    jshint: {
      bowie: {
        src: ["lib/**/*.js"],
        options: {
          jshintrc: ".jshintrc"
        }
      },
      specs: {
        src: ["specs/**/*.js"],
        options: {
          jshintrc: ".jshintrc-specs"
        }
      }
    },

    watch: {
      bowie: {
        files: "lib/**/*.js",
        tasks: ["specs"]
      },

      specs: {
        files: "specs/**/*.js",
        tasks: ["specs"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-jasmine-nodejs");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("specs", ["jshint", "jasmine_nodejs"]);
  grunt.registerTask("default", ["jshint", "watch"]);
};
