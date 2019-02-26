const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('nodemailer-express-handlebars');
const UserSchema = require('../models/userSchema');
const nodemailer = require('nodemailer');
const SignupRouter = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sachinnagraj00@gmail.com',
        pass: 'xxxxxxxxx'
    }
});

transporter.use('compile', hbs({
    viewPath: 'views',
    extName: '.hbs'
}));

SignupRouter.use(bodyParser.json());

SignupRouter.route('/')
.get((req,res,next)=>{
    UserSchema.find({})
    .then((data)=>{
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json(data);
    }).catch((err)=>{
        console.log(err);s
    });
})
        
.post((req,res,next)=>{
    UserSchema.create(req.body)
    .then(()=>{
        res.statusCode = 200;
        res.end("User has successfully added!!!")

        transporter.sendMail({
            from: 'sachinnagraj00@gmail.com',
            to: 'sachinnagraj00@gmail.com',
            subject: "signup mail",
            template: 'signup',
            context: { user : req.body.username}
    
        }, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        });

    }).catch((err)=>{
        console.log(err);
    })
})

.delete((req,res,next)=>{
    UserSchema.remove()
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = SignupRouter;
