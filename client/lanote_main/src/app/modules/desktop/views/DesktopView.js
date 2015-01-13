(function () {
    this.SectionView = Components.TreeView.extend({
        childView: Marionette.ItemView.extend({
            template: '#desktop-section-item',
            tagName: 'li'
        }),
        nodeView: Marionette.View.extend({
            tagName: 'ul',
        }),
        update: function () {
            var model = new (Backbone.Model.extend({
                restResource: 'section'
            }));
            model.fetch({
                success: function (model) {
                    this.model = new Components.TreeModel(model.toJSON());
                    this.render();
                }.bind(this)
            });
        },
        onSelectNode: function (node)
        {
            this.parentView.editor.editor.setValue('');
            var nid;
            if(nid = node.get('note_id'))
            {
                this.parentView.editor.fetchById(nid,false);
            }
        }
    });
    this.DesktopView = Components.Form.extend({
        template: '#desktop-form',
        views: {
            editor: Components.TextEditor.extend({
                saveNote: function () {
                    this.$('.error').empty();
                    var section, nid;
                    if (section = this.parentView.sections.selectedItem)
                    {
                        var value = this.editor.getValue();
                        var model = new (Backbone.Model.extend({
                            restResource: 'note'
                        }));
                        if (nid = section.get('note_id')) {
                            model.restPath = '/' + nid;
                            model.save({body: value}, {
                                success: function (model, res) {
                                    section.set({note_id: model.get('id')});
                                    this.parentView.saveSection();
                                }.bind(this)
                            });
                        } else {
                            lanote.prompt('Наименование записи', function (title) {
                                model.save({body: value}, {
                                    success: function (model, res) {
                                        section.add({note_id: model.get('id'),title:title});
                                        this.parentView.saveSection();
                                    }.bind(this)
                                });
                            }.bind(this));

                        }
                    } else {
                        this.$('.error').text('Необходимо выбрать раздел');
                    }


                }
            }),
            sections: this.SectionView
        },
        events: {
            'click #section-add': 'addSection'
        },
        addSection: function () {
            lanote.prompt('Наименование раздела', function (value) {
                this.sections.model.add({title: value});
                this.saveSection();
            }.bind(this));
        },
        saveSection: function () {
            var model = new (Backbone.Model.extend({
                restResource: 'section/',
                restPath: this.sections.model.get('id')
            }));
            model.save({nodes: this.sections.model.toJSON().nodes}, {
                success: function () {
                    this.sections.update();
                }.bind(this)
            });

        },
        onShow: function () {
            this.sections.update();
        }
    });
}).call(lanote.modules.desktop);


