/*Components.TreeModel = Backbone.TreeModel.extend({
    
});

Components.treeObj = {
    title:'Разделы',
    nodes:[
        {
            title:'section1',
            nodes:[
                {
                    title:'note1',
                    note_id:1
                },
                {
                    title:'note2',
                    note_id:2
                }
                
            ]
        },
        {
            title:'section2',
            nodes:[
                {
                    title:'note3',
                    note_id:3
                },
                {
                    title:'note4',
                    note_id:4
                }
                
            ]
        },
        {
            title:'section3'
        },
        {
            title:'section4'
        }
    ]
};
Components.tree = new Components.TreeModel(Components.treeObj);

Components.NodeView = Marionette.View.extend({
    tagName:'ul',
    childView: Marionette.ItemView.extend({
        template: '#tree-select-item',
        tagName: 'li'
    }),
    render:function(){
        var node,nodes = this.model.nodes();
        if(nodes&&(node = nodes.first))
        {
            do {
                //node - это модель для рендера
            } while(node.next())
        }
    }
})

Components.TreeView = Marionette.View.extend({
    tagName: 'div',
    className: 'tree',
    model: Components.tree,
    childView: Marionette.ItemView.extend({
        template: '#tree-select-item',
        tagName: 'li'
    }),
    nodeView: Marionette.View.extend({
        tagName: 'ul',
    }),
    render:function(){
        var nodesView = this.renderNode(this.model);
        if(nodesView)
        {
            this.el.appendChild(nodesView);
        }
        return this;
    },
    renderNode:function(model){
        debugger;
        var parent,node,nodesView,nodes = model.nodes();
        if(node = nodes.first())
        {
            parent =  this.getNodeElement();
            do {
                var view = new (this.childView.extend({
                    model:node
                }));//node - это модель для рендера
                view.render();
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
    }
});*/
