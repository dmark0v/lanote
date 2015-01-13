/**
 * SectionController
 *
 * @description :: Server-side logic for managing sections
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create:function(req,res){
        var params = {
            nodes:req.param('nodes'),
            user_id:req.session.user.id
            
        };
        Section.create(params).exec(function(err,section){
            if(err){
                return res.serverError();
            } else
            {
                return res.send(section);
            }
        });
        
    },
    find:function(req,res){
        Section.findOne({user_id:req.session.user.id}).exec(function(err,result){
            if(err){
                return res.serverError();
            }
            if(result)
            {
                res.send(result);
            } else
            {
                res.json(200,{nodes:[]});
            }
        });
    }
};

