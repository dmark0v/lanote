/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    createPublic:function(req,res){
        var params = {
            body:req.param('body'),
            public:true
        };
        Note.create(params).exec(function(err,note){
            if(err){
                return res.serverError();
            } else
            {
                return res.send(note.id);
            }
        });
    },
    getPublic:function(req,res){
        var id = req.param('id');
        Note.findOne({id:id,public:true}).exec(function(err,note){
            if(err){
                return res.serverError();
            }
            res.send(note);
        });
    },
    updatePublic:function(req,res){
        var id = req.param('id');
        Note.findOne({id:id,public:true}).exec(function(err,note){
            if(err){
                return res.serverError();
            }
            if(req.param('body'))
            {
                note.body = req.param('body');
            }
            note.save(function(error){
                if(error)
                {
                    return res.serverError();
                }
                res.send(note.id);
            });
            
        });

    }
    
};

