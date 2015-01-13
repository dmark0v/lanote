lanote.modules.static.SignInView = Components.ModalWindow.extend({
    headerTitle:lanote.locale.modules.static.userinfo.signin,
    template:'#static-signin',
    events:{
        'click #sign-in':'signIn',
        'click #sign-cancel':'close'
    },
    signIn:function(){
        this.$('.error>span').empty();
        var obj = this.getInputValues();
        obj.password = hex_sha1(obj.password);
        var model =new (Components.Model.extend({
            restResource:'login',
            restPath:'?username=' + obj.username +
                    '&password=' + obj.password
        }));
        model.fetch({
            dataType:'text',
            success:function(){
                this.close();
                lanote.static.getUserSession();
            }.bind(this),
            error:function(){
                this.$('.error>span').text('Ошибка входа. Неверный логин/пароль.');
            }.bind(this)
        });
    }
});

