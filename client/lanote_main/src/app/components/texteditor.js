Components.TextEditor = Backbone.Marionette.View.extend({
    tagName:'textarea',
    render:function(){
        tinymce.init({
           selector:'textarea' 
        });
        return this;
    }
});

