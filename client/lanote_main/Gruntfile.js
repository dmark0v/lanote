module.exports = function(grunt) {

    
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy:{
        dev:{
            cwd:'src',
            src:'**',
            dest:'build/development',
            expand:true
        }
    },
    sass:{
        dist:{
            options:{
                style:'expanded'
            },
            files:{
                'src/styles/main_new.css':'src/styles/scss/main.scss'
            }
        }
    }
  });
  var f = grunt.file.read('src/app/modules');
  console.log(f);
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('build', ['copy:dev']);
  grunt.registerTask('concat_module_content','Concat moulse content: views, models, templates etc.',function(){
      
  });

};