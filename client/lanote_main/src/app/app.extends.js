//function for including loaded template to template cache
Marionette.TemplateCache.storeTemplate = function (templateId, template) {
    if(!template){ return; }
    template = this.prototype.compileTemplate(template);
    var cachedTemplate = new this(templateId);
    cachedTemplate.compiledTemplate = template;
    this.templateCaches[templateId] = cachedTemplate;
}.bind(Marionette.TemplateCache);

//I don't need another one div with region
Marionette.Region.prototype.attachHtml = function (view)
{
    this.el.innerHTML = '';
    if (this.tagName)
    {
        this.el.appendChild(view.el);
    } else
    {
        //this shit is slower in 3-4 times
        //$(this.el).append($(view.el.innerHTML));
        var nodes = view.el.childNodes;
        for(var i=0;i<nodes.length;i++)
        {
            this.el.appendChild(nodes[i]);
        }
    }
};
//i need property to check what i don't need div
Backbone.View.prototype.tagName = void 0;

Backbone.View.prototype._ensureElement = function() {
    if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id)
            attrs.id = _.result(this, 'id');
        if (this.className)
            attrs['class'] = _.result(this, 'className');
        var tagName = _.result(this, 'tagName');
        if(!tagName)
        {
            tagName = 'div';
        }
        var $el = Backbone.$('<' + tagName + '>').attr(attrs);
        this.setElement($el, false);
    } else {
        this.setElement(_.result(this, 'el'), false);
    }
}