(function () {
    this.SectionView = Components.TreeView.extend({
        childView: Marionette.ItemView.extend({
            template: '#desktop-section-item',
            tagName: 'li'
        }),
        nodeView: Marionette.View.extend({
            tagName: 'ul',
        }),
        update:function(){
            var model =new (Backbone.Model.extend({
                restResource:'section'
            }));
            model.fetch({
                success:function(model){
                    this.model = new Components.TreeModel(model.toJSON());
                    this.render();
                }.bind(this)
            });
        }
    });
    this.DesktopView = Components.Form.extend({
        template: '#desktop-form',
        views: {
            editor: Components.TextEditor,
            sections: this.SectionView
        },
        onShow:function(){
            this.sections.update();
        }
    });
}).call(lanote.modules.desktop);


