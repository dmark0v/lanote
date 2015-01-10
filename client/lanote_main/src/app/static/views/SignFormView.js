lanote.modules.static.SignFormView = Components.Form.extend({
    template:'#static-signform',
    className:'header-signup',
    events:{
        'click #sign-in-modal':'openSignInWindow',
        'click #sign-up-modal':'openSignUpWindow'
    },
    views:{
        signin:lanote.modules.static.SignInView,
        signup:lanote.modules.static.SignUpView
    },
    openSignInWindow:function(){
        this.signin.render();
        this.signin.open();
    },
    openSignUpWindow:function(){
        this.signup.render();
        this.signup.open();
    }
});