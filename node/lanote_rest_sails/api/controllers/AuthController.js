/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    login:function(req,res){
        var username = req.param('username');
        var password = req.param('password');
        if(!username||!password){
            return res.badRequest();
        }
        console.log('2');
        User.findOneByUsername(username).exec(function(err,user){
            if(err)
            {
                return res.serverError();
            }
            console.log('2');
            if(!user)
            {
                return res.json(400,{error:'user not found'});
            }
            if(password === user.password)
            {
                req.session.authenticated = true;
                req.session.user = user;
                return res.ok();
            } else
            {
                return res.json(400,{error:'password incorrect'});
            }
        });
    },
    getUser:function(req,res){
        if(req.session.authenticated&&req.session.user)
        {
            return res.json(200,req.session.user);
        } else
        {
            return res.json(400,{error:'session is undefined'});
        }
    },
    logout:function(req,res){
        req.session.authenticated = false;
        delete req.session.user;
        return res.ok();
    }
}