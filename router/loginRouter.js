const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const UserSchema = require('../models/userSchema');

const loginRouter = express.Router();

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

loginRouter.use(bodyParser.json());

loginRouter.route('/')
    .post((req, res, next) => {
        UserSchema.find({ email: req.body.email })
            .then((data) => {
                bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                    if (result == true) {
                        res.send('Authentication Successfull');

                        transporter.sendMail({
                            from: 'sachinnagraj00@gmail.com',
                            to: 'viveks@latitudefintech.com',
                            subject: "Login mail",
                            template: 'login',
                            context: { user : data[0].username}
                        }, (err, res) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(res);
                            }
                        });
                    } else if(err) {
                     res.send('Incorrect password');
                    }
                })
            }).catch((err) => {
                console.log(err);
            })
    });

module.exports = loginRouter;