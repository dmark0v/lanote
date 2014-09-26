

module.exports = function (grunt) {

    var module_dirs = {static:'src/app/static'};
    grunt.file.recurse('src/app/modules/', function (abspath, rootdir, subdir, filename) {
        if (subdir.indexOf('/') >= 0)
        {
            return;
        }
        module_dirs[subdir] = 'src/app/modules/'+subdir;
    });
    var concat_config = {
        components:{
            options:{
                banner:'/*Components of lanote*/\n'
            },
            src:'src/app/components/*.js',
            dest:'build/development/app/components.js'
        }
    };
    var copy_config = {
        main:{
            cwd:'src',
            src:'*.*',
            dest:'build/development',
            expand:true
        },
        libs: {
            cwd: 'src/js',
            src: '**',
            dest: 'build/development/js',
            expand: true
        },
        img: {
            cwd: 'src/img',
            src: '**',
            dest: 'build/development/img',
            expand: true
        },
        styles:{
            cwd: 'src/styles',
            src: ['*.css','*.map'],
            dest: 'build/development/styles',
            expand: true
        },
        app:{
            cwd:'src/app',
            src:'*.*',
            dest:'build/development/app',
            expand:true
        }
    };
    for (var module in module_dirs)
    {
        concat_config['md_'+module+'_js'] = {
            options:{
                banner:'/*Views and modules of ' + module + 'module*/\n'
            },
            src:[module_dirs[module]+'/*/*.js'],
            dest:module_dirs[module].replace('src','build/development') + '/' + module + '_js.js'
        };
        concat_config['md_'+module+'_templates'] = {
            options:{
                process:function(src, filepath,chto){
                    var fileParts = filepath.split('/');
                    var fileName = fileParts[fileParts.length - 1];
                    fileName = fileName.split('.')[0];
                    return '<!--@' + fileName + '@-->' + '<!--@@@-->' + src + '<!--@@@-->';
                }
            },
            src:[module_dirs[module]+'/*/*.tpl'],
            dest:module_dirs[module].replace('src','build/development') + '/' + module + '_template.tpl'
        };
        copy_config['md_'+module] = {
            cwd:module_dirs[module],
            src:[module + '.js'],
            expand:true,
            dest:module_dirs[module].replace('src','build/development')
        };
        
    }
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:concat_config,
        copy: copy_config,
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/styles/main_new.css': 'src/styles/scss/main.scss'
                }
            }
        }
    });


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Default task(s).
    grunt.registerTask('build', ['copy','concat']);
};