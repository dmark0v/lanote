Components.TextEditor = Backbone.Marionette.ItemView.extend({
    className:'texteditor panel-shadow',
    template:'#cmp-texteditor',
    onRender:function(){
        
        this.editor = new wysihtml5.Editor(this.$('.textarea')[0], { // id of textarea element
          toolbar:      this.$('.toolbar')[0], // id of toolbar element
          parserRules:  wysihtml5ParserRules // defined in parser rules set 
        });
    }
});

