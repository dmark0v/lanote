lanote.modules.starting.StartNoteView = Components.Form.extend({
   template:'#starting-note', 
   views:{
       editor:Components.TextEditor.extend({
           saveNote:function(){
               this.$('.error').empty();
               var value = this.editor.getValue();
               
               var model = new (Backbone.Model.extend({
                   restResource:'note/public'
               }));
               if(this.nid)
               {
                   model.restPath = '/' + this.nid;
               }
               model.save({body:value},{
                  dataType:'text',
                  success:function(model,res){
                      this.nid = res;
                      lanote.router.navigate('public/'+res);
                  }.bind(this),
                  error:function(){
                      this.$('.error').text('Сохранить не удалось. Произошла ошибка.');
                  }.bind(this)
               });
           }
       })
   }
   
   
});

