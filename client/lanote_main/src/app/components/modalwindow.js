Components.ModalWindow = Backbone.Marionette.ItemView.extend({
    template:'#cmp-modal',
    tagName:'div',
    className:'modal-wrapper',
    open:function(){
        $('#mask').show().animate({opacity:0.75},400,function(){
            this.$('.modal').show();
        }.bind(this));
        
    },
    close:function(){
        $('#mask').animate({opacity:1},200).hide();
         this.$('.modal').hide();
    }
});

