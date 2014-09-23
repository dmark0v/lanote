window.lanote = new Backbone.Marionette.Application();

lanote.addRegions({
    header:'#header'
});




lanote.controller = {
    default:function(){
        console.log('default')
    },
    foo:function(){
        console.log('foo')
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

