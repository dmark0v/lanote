lanote.modules.desktop = lanote.module('desktop',Components.Module.extend({
   startWithParent:false,
   isPage:true,
   onStart:function(){
       lanote.content.show(new this.DesktopView());
   } 
}));