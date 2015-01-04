window.UserInfoView = Components.Form.extend({
    template:'#static-userinfo',
    className:'header-signup',
    events:{
        'click #sign-in':'openSignInWindow'
    },
    views:{
        signin:Components.ModalWindow
    },
    openSignInWindow:function(){
        this.signin.open();
    }
});