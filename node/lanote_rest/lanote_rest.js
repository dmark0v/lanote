var express         = require('express');//framewor for creating small web-services
var path            = require('path');//path parser
var log             = require('./libs/log')(module);
var config          = require('./libs/config');
var UserModel       = require('./libs/dbworker').UserModel;



var app=express();

app.use(express.favicon());//use standart faviicon(we could use my own)
app.use(express.logger('dev'));//put all requests into console
app.use(express.bodyParser());//standart module for parsing json in reuests body
app.use(express.methodOverride());//put and delete 
app.use(app.router);//router
app.use(express.static(path.join(__dirname,'public')));//static fileserver that watch public directory(in our app give you index.html)

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.get('/api',function(req,res){
   log.info('ahahaha');
   res.send('<b>LANOTE REST API</b>'); 
});

app.listen(config.get('port'),function(){
   log.info('rest server started listening on port ' + config.get('port'));
});

app.get('/api/users',function(req,res){
    return UserModel.find(function(err,users){
        if(!err)
        {
            return res.send(users);
        } else
        {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({error:'Server error'});
        }
    });
});

app.post('/api/users',function(req,res){
    var user = new UserModel({
       _id:req.body.login,
       password:req.body.password,
       email:req.body.email
    });
    user.save(function(err){
        if(!err)
        {
            log.info('User %s created',user.get('_id'));
            return res.send({ status: 'OK', data:user });
        } else
        {
            if(err.name==='ValidationError'){
                res.statusCode = 400;
                res.send({error:'Validation error'});
            } else
            {
                res.statusCode = 500;
                res.send({error:'Server error'});
            }
            log.error('Internal error(%d):%s',res.statusCode,err.message);
        }
    });
});

app.get('/api/users/:id',function(req,res){
    return UserModel.findById(req.params.id,function(err,user){
        if(!user)
        {
            res.statusCode = 404;
            return res.send({error:'Not found'});
        }
        if(!err)
        {
            return res.send({status:'OK',data:user});
        } else
        {
            res.statusCode = 500;
            log.error('Internal error(%d):%s',res.statusCode,err.message);
            return res.send({error:'Server error'});
        }
            
    });
});

app.put('/api/users/:id',function(req,res){
    return UserModel.findById(req.params.id,function(err,user){
        if(!user)
        {
            res.statusCode = 404;
            return res.send({error:'Not found'});
        }
        user.password = req.body.password;
        user.email = req.body.email;
        return user.save(function(err){
            if(!err)
            {
                log.info('user %s updated',user.get('_id'));
                return res.send({status:'OK',data:user});
            } else
            {
                if(err.name==='ValidationError')
                {
                    res.statusCode = 400;
                    res.send({error:'Validation error'});
                } else
                {
                    res.statusCode = 500;
                    res.send({error:'Server error'});
                }
                log.error('Internal error(%d):%s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/api/users/:id',function(req,res){
    return UserModel.findById(req.params.id, function(err,user){
        if(!user)
        {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return user.remove(function(err){
            if(!err)
            {
                log.info('user removed');
                return res.send({status:'OK'});
            } else
            {
                res.statusCode = 500;
                log.error('Internal error(%d):%s',res.statusCode,err.message);
                return res.send({error:'Server error'});
            }
        });
    });
});

