Components.TextEditor = Backbone.Marionette.ItemView.extend({
    className:'texteditor panel-shadow',
    template:'#cmp-texteditor',
    events:{
        'click .btn-save-note':'saveNote'
    },
    fetchById:function(id,public)
    {
        var model = new Backbone.Model();
        model.restResource = (public)?'note/public':'note';
        model.restPath = '/' + id;
        model.fetch({
            success:function(model){
                this.editor.setValue(model.get('body'));
            }.bind(this)
        });
    },
    saveNote:function(){
        
    },
    onRender:function(){
        
        this.editor = new wysihtml5.Editor(this.$('.textarea')[0], { // id of textarea element
          toolbar:      this.$('.toolbar')[0], // id of toolbar element
          parserRules:  wysihtml5ParserRules // defined in parser rules set 
        });
    }
});

