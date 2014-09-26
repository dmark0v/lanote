//function for including loaded template to template cache
Marionette.TemplateCache.storeTemplate = function (templateId, template) {
    if(!template){ return; }
    template = this.prototype.compileTemplate(template);
    var cachedTemplate = new this(templateId);
    cachedTemplate.compiledTemplate = template;
    this.templateCaches[templateId] = cachedTemplate;
}.bind(Marionette.TemplateCache);
