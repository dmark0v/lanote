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
    loadTemplates:function(){
        var url = ((this.directory)?this.directory:('app/modules/' + this.moduleName)) +
                '/' + this.moduleName + '_template.tpl';
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
            $.when(this.loadScripts(),this.loadTemplates()).done(function(){
                this.triggerMethod('start', options);
            }.bind(this));
        } else
        {
            this.triggerMethod('start', options);
        }
        
    }
});

