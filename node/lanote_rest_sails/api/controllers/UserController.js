/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	checkEmail:function(req,res){
            var email = req.param('email');
            User.findOne({email:email}).exec(function(err,user){
               if(err){
                   return res.serverError();
               }
               if(user)
               {
                   res.json(409,{error:'such email already exist'});
               } else
               {
                   res.json(200,{status:'ok'});
               }
            });
        },
        checkUsername:function(req,res){
            var username = req.param('username');
            User.findOne({username:username}).exec(function(err,user){
               if(err){
                   return res.serverError();
               }
               if(user)
               {
                   res.json(409,{error:'such username already exist'});
               } else
               {
                   res.json(200,{status:'ok'});
               }
            });
        }
};

