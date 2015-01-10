Components.Model = Backbone.Model.extend({
    url: function ()
    {
        if(_.isFunction(this.restResource))
        {
            this.restResource = this.restResource();
        }
        return lanote.config.rest + this.restResource + ((this.restPath) ? this.restPath : '');
    }
});

