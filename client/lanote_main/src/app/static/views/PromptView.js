lanote.modules.static.PromptView = Components.ModalWindow.extend({
    headerTitle:lanote.locale.modules.static.prompt,
    template:'#static-prompt',
    events:{
        'click .prompt-ok':'ok',
        'click .prompt-cancel':'close'
    },
    ok:function(){
        var value = this.$('#prompt-value').val();
        this.callback(value);
        this.close();
    }
});

