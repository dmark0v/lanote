Components.Form = Marionette.ItemView.extend({
    render: function () {
        this._ensureViewIsIntact();

        this.triggerMethod('before:render', this);
        this._renderTemplate();
        this._renderViews();
        this.bindUIElements();

        this.triggerMethod('render', this);

        return this;
    },
    _renderTemplate: function () {
        var template = this.getTemplate();
        if (template === false) {
            return;
        }

        if (!template) {
            throw new Marionette.Error({
                name: 'UndefinedTemplateError',
                message: 'Cannot render the template since it is null or undefined.'
            });
        }
        var data = this.serializeData();
        data = this.mixinTemplateHelpers(data);
        if (this.views)
        {
            data = this.mixinViewsContainers(data);
        }
        var html = Marionette.Renderer.render(template, data, this);
        this.attachElContent(html);

        return this;
    },
    mixinViewsContainers: function (data)
    {
        data.views = {};
        _.each(this.views, function (view, name) {
            data.views[name] = '<div id='+ name +'></div>';
        });
        return data;
    },
    _renderViews:function(){
        _.each(this.views,function(view,name){
            if(_.isFunction(view))
            {
                view = this[name] = new view;
                this.$('#' + name).replaceWith(view.render().el);
                view.parentView = this;
            } else if(view)
            {
                view.render();
                view.parentView = this;
            }
            
            
        }.bind(this));
    },
    onBeforeDestroy:function(){
        //do it
    },
    getInputValues:function(){
        var res = {};
        this.$('input[name]').each(function(i,el){
            res[el.name] = el.value;
        });
        return res;
    }
});