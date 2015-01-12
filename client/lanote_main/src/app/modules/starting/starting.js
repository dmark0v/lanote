lanote.modules.starting = lanote.module('starting',Components.Module.extend({
   startWithParent:false,
   isPage:true,
   onStart:function(){
       lanote.content.show(new lanote.modules.starting.StartNoteView());
   } 
}));