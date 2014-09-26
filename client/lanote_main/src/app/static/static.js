lanote.modules.static = lanote.module('static',Components.Module.extend({
    directory:'app/static',
    onStart:function(){
        lanote.header.show(new HeaderView);
    }
}));


