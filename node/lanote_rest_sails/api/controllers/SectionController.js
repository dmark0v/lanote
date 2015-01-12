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
                return res.send(section.id);
            }
        });
        
    },
    find:function(req,res){
        Section.findOne({user_id:req.session.user.id}).exec(function(err,result){
            console.log('123123123');
            if(err){
                return res.serverError();
            }
            console.log(result);
            res.send(result);
        });
    }
};

