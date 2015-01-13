lanote.modules.static.SignUpView = Components.ModalWindow.extend({
    headerTitle:lanote.locale.modules.static.userinfo.signup,
    template:'#static-signup',
    events:{
        'click #sign-up':'signUp',
        'click #sign-up-cancel':'close',
        'blur #cpassword>input':'validatePassword',
        'blur #email>input':'validateEmail',
        'blur #login>input':'validateUsername'
    },
    getError:function(text){
        var html = '<span class="error">' + text +'</span>';
        return $(html);
    },
    validatePassword:function(){
        var user = this.getInputValues();
        this.$('#password>span').remove();
        if(user.passwordConfirm!==user.password)
        {
            this.$('#password').prepend(this.getError('пароли не совпадают'));
            this.$('#cpassword').prepend(this.getError('пароли не совпадают'));
            return false;
        } else
        {
            return true;
        }
    },
    validateEmail:function(){
        this.$('#email>span').remove();
        var email = this.$('#email>input').val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            this.$('#email').prepend(this.getError('email невалидный'));
            return false;
        } else
        {
            var model = new Backbone.Model();
            var res;
            model.restResource = 'user/checkEmail/';
            model.restPath = email;
            model.fetch({
                async:false,
                success:function(){
                    res = true;
                },
                error:function(){
                    this.$('#email').prepend(this.getError('такой email уже зарегестрирован'));
                    res = false;
                }.bind(this)
            });
            
            return res;
        };    
    },
    validateUsername:function(){
        this.$('#login>span').remove();
        var username = this.$('#login>input').val();
        var model = new Backbone.Model();
        var res;
        model.restResource = 'user/checkUsername/';
        model.restPath = username;
        model.fetch({
            async:false,
            success:function(){
                res = true;
            },
            error:function(){
                this.$('#login').prepend(this.getError('пользователь с таким логином уже зарегестрирован'));
                res = false;
            }.bind(this)
        });
        return res;
    },
    signIn:function(username,pass){
        var model =new (Components.Model.extend({
            restResource:'login',
            restPath:'?username=' + username +
                    '&password=' + pass
        }));
        model.fetch({
            dataType:'text',
            success:function(){
                this.close();
                lanote.static.getUserSession();
            }.bind(this)
        });
    },
    signUp:function(){
        
        var user = this.getInputValues();
        var model = new (Components.Model.extend({
            restResource:'user'
        }));
        if(!this.validatePassword()||!this.validateEmail()||!this.validateUsername()) return;
        user.password = hex_sha1(user.password);
        model.save(user,{
            success:function(model){
                this.signIn(user.username,user.password);
            }.bind(this)
        });
    }
});

