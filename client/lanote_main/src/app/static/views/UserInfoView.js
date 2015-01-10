lanote.modules.static.UserInfoView = Components.Form.extend({
    template:'#static-userinfo',
    className:'header-signup',
    events:{
        'click #logout':'logout'
    },
    logout:function(){
        var model =new (Components.Model.extend({
            restResource:'logout'
        }));
        model.fetch({
            dataType:'text',
            success:function(){
                lanote.static.getUserSession();
            }.bind(),
            error:function(){
                //TODO: show what user is incorrect
            }
        });
    }
});