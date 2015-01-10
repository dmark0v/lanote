lanote.modules.static.SignUpView = Components.ModalWindow.extend({
    headerTitle:lanote.locale.modules.static.userinfo.signup,
    template:'#static-signup',
    events:{
        'click #sign-up':'signUp',
        'click #sign-up-cancel':'close'
    },
    signUp:function(){
        var user = this.getInputValues();
        delete user.passwordConfirm;
        var model = new (Components.Model.extend({
            restResource:'user'
        }));
        debugger;
        user.password = hex_sha1(user.password);
        model.save(user,{
            success:function(model){
                debugger;
                this.close();
            }.bind(this)
        });
    }
});

