Components.TextEditor = Backbone.Marionette.View.extend({
    tagName:'textarea',
    onShow:function(){
        tinymce.init({
           selector:'textarea' 
        });
    }
});

