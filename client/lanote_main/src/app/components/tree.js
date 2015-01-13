Components.TreeView = Marionette.View.extend({
    tagName: 'div',
    className: 'tree',
    /*model: Components.tree,
    childView: Marionette.ItemView.extend({
        template: '#tree-select-item',
        tagName: 'li'
    }),*/
    /*nodeView: Marionette.View.extend({
        tagName: 'ul',
    }),*/
    events:{
        'click .node-title':'selectNode'
    },
    selectNode:function(el){
        var ul = el.target.parentNode.getElementsByTagName('ul')[0];
        this.$('li').removeClass('choosen');
        if(ul)
        {
            if(ul.className === 'active')
            {
                ul.removeAttribute('class');
            } else
            {
                this.$('ul').removeClass('active');
                ul.setAttribute('class','active');
                el.target.parentNode.setAttribute('class','choosen');
                
            }
        } else {
            $(el.target.parentNode.parentNode).find('>li>ul').removeClass('active');
            el.target.parentNode.setAttribute('class','choosen');
        }
        this.selectedItem = el.target.parentNode.model;
        this.onSelectNode(el.target.parentNode.model);
        
    },
    render:function(){
        if(!this.model) return this;
        this.$el.empty();
        var nodesView = this.renderNode(this.model);
        if(nodesView)
        {
            this.el.appendChild(nodesView);
        }
        return this;
    },
    renderNode:function(model){
        var parent,node,nodesView,nodes;
        if((nodes = model.nodes())&&(node = nodes.first()))
        {
            parent =  this.getNodeElement();
            do {
                var view = new (this.childView.extend({
                    model:node
                }));//node - это модель для рендера
                view.render();
                view.el.model = node;
                if(node.nodes()&&(nodesView = this.renderNode(node)))
                {
                    view.el.appendChild(nodesView);
                }
                parent.appendChild(view.el);
            } while(node = node.next())
        }
        return parent;
    },
    getNodeElement:function(){
        return (new this.nodeView()).el;
    },
    onSelectNode:function(model)
    {
        //this function should be overriden
    }
});

