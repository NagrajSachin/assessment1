const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const SignupRouter = require('./router/SignupRouter');
const loginRouter = require('./router/loginRouter');
const ResetRouter = require('./router/ResetRouter');

const hostname = 'localhost';
const port = 8080;
const app = express();
app.use(morgan('dev'));

const url = "mongodb://localhost:27017/data";
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("connected to database");
}, (err)=>{
    console.log(err);
});

app.use('/signup',SignupRouter);
app.use('/login',loginRouter);
app.use('/reset',ResetRouter);

app.listen(port,hostname, ()=>{
    console.log('server running on port' + hostname + " " + port);
});