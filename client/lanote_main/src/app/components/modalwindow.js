Components.ModalWindow = Components.Form.extend({
    tagName:'div',
    className:'modal-wrapper',
    constructor:function(options){
        Marionette.View.apply(this, arguments);    
        this.initBodyView();
        this.initTitle();
    },
    initBodyView:function(){
        var BodyView = Marionette.ItemView.extend({
           tagName:'div' ,
           className:'modal-body',
           template:this.template,
           views:this.views
        });
        this.template = '#cmp-modal';
        this.views = {
            modalBody:BodyView
        };
    },
    initTitle:function(){
        if(!this.templateHelpers){
            this.templateHelpers = {};
        }
        this.templateHelpers.headerTitle = this.headerTitle;
    },
    open:function(){
        var bodyHeight = $('body').height();
        var modalHeight = this.$('.modal').height();
        var top = (bodyHeight - modalHeight)/2 - 70;
        top = (top>=0)?top:0;
        $('#mask').show().animate({opacity:0.75},400,function(){
            this.$('.modal').animate({top:top}).show();
        }.bind(this));
        
    },
    close:function(){
        $('#mask').animate({opacity:1},200).hide();
         this.$('.modal').hide();
    }
});

