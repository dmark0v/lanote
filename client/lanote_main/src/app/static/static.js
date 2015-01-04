lanote.modules.static = lanote.module('static',Components.Module.extend({
    directory:'app/static',
    templates:['app/component_templates.tpl'],
    onStart:function(){
        lanote.header.show(new HeaderView());
        lanote.content.show(new Components.ModalWindow());
        /*var headerView  = new HeaderView;
        headerView.render();*/
    }
}));


