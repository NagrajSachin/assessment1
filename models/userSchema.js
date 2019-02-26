const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var saltRounds = 10;

const randomSchema = new Schema({
    ramdom: { type : String}
});
const userSchema = new Schema({
    username : 
    {
        type : String,
        required : true,
        unique : true
    },
    password : 
    {
        type : String,
        required : true
    },
    email : 
    {
        type : String,
        required : true
    },
    token : 
    {
        type : String
    },
    tokenExpired : 
    {
        type : Boolean
    }
},
    {
        timestamps : true
});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });

const UserSchema = mongoose.model('user',userSchema);

module.exports = UserSchema;