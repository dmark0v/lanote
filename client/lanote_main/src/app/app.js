window.Components = {
    
};

window.lanote = new Backbone.Marionette.Application();

lanote.addRegions({
    header:'#header',
    content:'#content'
});




lanote.controller = {
    default:function(){
        console.log('default');
    },
    foo:function(){
        //lanote.static.start();
    }
}

lanote.router = new Marionette.AppRouter({
    controller:lanote.controller,
    appRoutes:{
        '':'default',
        'foo':'foo'
    }
});

lanote.on('start',function(){
    Backbone.history.start();
});

lanote.modules={};

