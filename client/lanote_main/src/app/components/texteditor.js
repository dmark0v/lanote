Components.TextEditor = Backbone.Marionette.ItemView.extend({
    template:'#cmp-texteditor',
    onRender:function(){
        debugger;
        this.$('textarea').tinymce({});
    }
});

