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
        },
        components_templates:{
            src:'src/app/components/templates/*.tpl',
            dest:'build/development/app/component_templates.tpl',
            options:{
                process:function(src, filepath){
                    var fileParts = filepath.split('/');
                    var fileName = fileParts[fileParts.length - 1];
                    fileName = fileName.split('.')[0];
                    return '<!--@' + fileName + '@-->' + '<!--@@@-->' + src + '<!--@@@-->';
                }            
            }
        }
    };
    var copy_config = {
        main:{
            cwd:'src',
            src:'*.*',
            dest:'build/development',
            expand:true
        },
        locale: {
            cwd: 'src/locale',
            src: '**',
            dest: 'build/development/locale',
            expand: true
        },
        fonts:{
            cwd:'src/fonts',
            src:'**',
            dest: 'build/development/fonts',
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
        var viewsDir = module_dirs[module] + '/views/map.json';
        var viewsSrc = undefined;
        try{
            viewsSrc = grunt.file.readJSON(viewsDir).src;
            for(var i=0;i<viewsSrc.length;i++)
            {
                viewsSrc[i] = module_dirs[module] + '/views/' + viewsSrc[i];
            }
        } catch(e) {}
        concat_config['md_'+module+'_js'] = {
            options:{
                banner:'/*Views and modules of ' + module + 'module*/\n'
            },
            src:(viewsSrc)?viewsSrc:[module_dirs[module]+'/*/*.js'],
            dest:module_dirs[module].replace('src','build/development') + '/' + module + '_js.js'
        };
        concat_config['md_'+module+'_templates'] = {
            options:{
                process:function(src, filepath){
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
        watch:{
            options:{
                spawn:true  
            },
            js:{
                files:'src/app/*.js',
                tasks:['copy:single']
            }
            
        },
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('build', ['sass','copy','concat']);

};