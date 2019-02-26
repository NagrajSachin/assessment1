const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('nodemailer-express-handlebars');
const ResetRouter = express.Router();
const UserSchema = require('../models/userSchema');
const nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sachinnagraj00@gmail.com',
        pass: 'xxxxxxxx'
    }
});

transporter.use('compile', hbs({
    viewPath: 'views',
    extName: '.hbs'
}));

ResetRouter.use(bodyParser.json());


ResetRouter.route('/')
    .post((req, res, next) => {
        var rand = uuidv1();
        UserSchema.findOne({ email: req.body.email }, (err, data) => {
            if (err) {
                res.send(err);
            }
            else if (data) {
                data.token = rand;
                data.tokenExpired = false;
                data.save();
            }
            transporter.sendMail({
                from: 'sachinnagraj00@gmail.com',
                to: 'sachinnagraj00@gmail.com',
                subject: "Reset mail",
                template: 'reset',
                context: {
                    user: data.username,
                    token: data.token
                }
            }, (err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(res);
                }
            })
        })
        res.end('email sent');
    })


ResetRouter.route('/:token')
    .put((req, res, next) => {
        UserSchema.findOneAndUpdate(req.params.token,
            { $set: req.body }, { new: true })
            .then((data)=>{
                res.statusCode = 200;
                res.setHeader('content-type','application/json');
                res.json(data);
            }).catch((err)=>{
                console.log(err);
            })
    });

module.exports = ResetRouter;