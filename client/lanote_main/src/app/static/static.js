//TODO:render header before getting user by session
lanote.modules.static = lanote.module('static',Components.Module.extend({
    directory:'app/static',
    templates:['app/component_templates.tpl'],
    onStart:function(){
        this.getUserSession();
    },
    onAfterStart:function(){
        
    },
    getUserSession:function(){
        var userModel = new (Components.Model.extend({
            restResource:'getUserBySession'
        }));
        
        userModel.fetch({
            //user already logged in
            success:function(){
                var headerView = new HeaderView();
                headerView.views.uiForm = lanote.modules.static.UserInfoView;
                lanote.header.show(headerView);
                lanote.modules.desktop.start();
                lanote.router.navigate('');
                $.when.apply($, lanote.modules.desktop.defs).done(this.onAfterStart);
            }.bind(this),
            //user not logged
            error:function(){
                var headerView = new HeaderView();
                headerView.views.uiForm = lanote.modules.static.SignFormView;
                lanote.header.show(headerView);
                lanote.modules.starting.start();
                $.when.apply($, lanote.modules.starting.defs).done(this.onAfterStart);
            }.bind(this)
        });
    }
}));


