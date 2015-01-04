Components.Module = Marionette.Module.extend({
    loadFiles:true,
    //dynamically loaded binded script file
    loadScripts:function(){
        var url = ((this.directory)?this.directory:('app/modules/' + this.moduleName)) + 
                '/' + this.moduleName + '_js.js';
        return $.ajax({
            dataType: 'script',
            url: url
        });
        
    },
    //dynamically loaded binded template file
    //and stores it in Marionette.TemplateCache
    loadTemplate:function(url){
        return $.ajax({
            dataType:'text',
            url:url,
            success:function(text){
                var templates = text.split('<!--@@@-->');
                for(var i = 0;i<templates.length-1;i+=2)
                {
                    var templateId = '#' + templates[i].replace('<!--@','').replace('@-->','').trim();
                    var template = templates[i+1];
                    Marionette.TemplateCache.storeTemplate(templateId,template);
                }
            }
        });
    },
    loadTemplates:function(){
        var url = ((this.directory)?this.directory:('app/modules/' + this.moduleName)) +
                '/' + this.moduleName + '_template.tpl';
        if(this.templates&&this.templates.length)
        {
            var defs = [];
            defs.push(this.loadTemplate(url));
            for(var i=0;i<this.templates.length;i++)
            {
                defs.push(this.loadTemplate(this.templates[i]));
            }
            return defs;
        } else
        {
            return this.loadTemplate(url);
        }
    },
    //rewrite start function for including dynamic loading
    // of scripts and templates
    start: function (options) {
        if (this._isInitialized) {
            return;
        }
        _.each(this.submodules, function (mod) {
            if (mod.startWithParent) {
                mod.start(options);
            }
        });
        this.triggerMethod('before:start', options);

        this._initializerCallbacks.run(options, this);
        this._isInitialized = true;
        if(this.loadFiles)
        {
            var defs = [];
            //loading files
            var scriptsDefs = this.loadScripts();
            var templateDefs = this.loadTemplates();
            //check if we loading more than 1 file
            if(_.isArray(scriptsDefs))
            {
                defs = defs.concat(scriptsDefs);
            } else
            {
                defs.push(scriptsDefs);
            }
            if(_.isArray(templateDefs))
            {
                defs = defs.concat(templateDefs);
            } else
            {
                defs.push(templateDefs);
            }
            //wait when files would be loaded
            $.when.apply($,defs).done(function(){
                this.triggerMethod('start', options);
            }.bind(this));
        } else
        {
            this.triggerMethod('start', options);
        }
        
    }
});

