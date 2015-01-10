lanote.modules.starting = lanote.module('starting',Components.Module.extend({
   startWithParent:false,
   onStart:function(){
       lanote.content.show(new lanote.modules.starting.StartNoteView());
   } 
}));