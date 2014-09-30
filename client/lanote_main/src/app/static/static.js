lanote.modules.static = lanote.module('static',Components.Module.extend({
    directory:'app/static',
    onStart:function(){
        debugger;
        lanote.header.show(new HeaderView());
        /*var headerView  = new HeaderView;
        headerView.render();*/
    }
}));


