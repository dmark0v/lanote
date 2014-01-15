var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');



mongoose.connect(config.get('mongo:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var User = new Schema({
    _id:{type:String, required:true},//login
    password:{type:String, required:true },
    email:{type:String,required:true},
    hashedPassword:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }
});

User.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

User.path('password').validate(function(v){
   return v.length<32; 
});

var UserModel = mongoose.model('User',User);

module.exports.UserModel = UserModel;


