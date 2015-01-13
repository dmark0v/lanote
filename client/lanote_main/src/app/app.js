window.Components = {
    
};

window.lanote = new Backbone.Marionette.Application();

lanote.addRegions({
    header:'#header',
    content:'#content',
    propmptWrapper:'#prompt'
});




lanote.controller = {
    default:function(){
        console.log('default');
    },
    public:function(id){
        lanote.modules.static.onAfterStart = function(){
            if(lanote.content.currentView.editor)
            {
                lanote.content.currentView.editor.nid = id;
                lanote.content.currentView.editor.fetchById(id,true);
            }
            lanote.modules.static.onAfterStart = function(){};
        };
    }
};

lanote.router = new Marionette.AppRouter({
    controller:lanote.controller,
    appRoutes:{
        '':'default',
        'public/:id':'public'
    }
});

lanote.on('start',function(){
    Backbone.history.start();
});

lanote.prompt = function(text,callback){
    var promptView = new (lanote.modules.static.PromptView.extend({
        callback:callback,
        templateHelpers:{
            text:text
        }
    }));
    debugger;
    lanote.propmptWrapper.show(promptView);
    lanote.propmptWrapper.currentView.open();
};

lanote.modules={};

