lanote.modules.starting = lanote.module('starting',Components.Module.extend({
   startWithParent:false,
   isPage:true,
   onStart:function(){
       var starting = new lanote.modules.starting.StartNoteView();
       lanote.content.show(starting);
   } 
}));